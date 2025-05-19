import NextAuth, { DefaultSession, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Twitter from 'next-auth/providers/twitter';
import { signInSchema } from './lib/validation';
import db from './db';
import { users } from './db/schema';
import { compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { config } from './lib/config';
import type { Provider } from 'next-auth/providers';

// Extend the Session type to include tokens
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    twitterAccessToken?: string;
    twitterAccessSecret?: string;
    user?: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
      twitterId?: string;
      twitterUsername?: string;
    } & DefaultSession['user'];
  }

  interface JWT {
    id?: string;
    name?: string;
    accessToken?: string;
    refreshToken?: string;
    twitterAccessToken?: string;
    twitterAccessSecret?: string;
    twitterId?: string;
    twitterUsername?: string;
    accessTokenExpires?: number;
  }
}

const providers: Provider[] = [
  Google({
    clientId: config.env.google.id,
    clientSecret: config.env.google.secret,
    authorization: {
      params: {
        scope:
          'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.modify openid email profile',
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  }),
  Twitter({
    clientId: config.env.twitter.id,
    clientSecret: config.env.twitter.secret,
    authorization: {
      params: {
        scope: 'tweet.read users.read offline.access',
      },
    },
    profile(profile) {
      return {
        id: profile.data.id,
        name: profile.data.name,
        email: null,
        image: profile.data.profile_image_url,
        twitterId: profile.data.id,
        twitterUsername: profile.data.username,
      };
    },
  }),
  Credentials({
    credentials: {
      email: {},
      password: {},
    },

    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }

      try {
        const validatedCredentials = await signInSchema.parseAsync(credentials);
        const { email, password } = validatedCredentials;

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!user.length) return null;

        const isValidPassword = await compare(password, user[0].password);

        if (!isValidPassword) return null;

        return {
          id: user[0].id.toString(),
          email: user[0].email.toString(),
          name: user[0].fullName.toString(),
        } as User;
      } catch (error) {
        console.error('Auth error:', error);
        return null;
      }
    },
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers,
  pages: {
    signIn: '/signin',
    error: '/auth/error',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/home`;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }

      if (account) {
        if (account.provider === 'google') {
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          token.accessTokenExpires = account.expires_at
            ? account.expires_at * 1000
            : 0;
        } else if (account.provider === 'twitter') {
          token.twitterAccessToken = account.oauth_token;
          token.twitterAccessSecret = account.oauth_token_secret;
          token.twitterId = account.providerAccountId;
          token.twitterUsername = account.username;
        }
      }

      if (
        token.accessTokenExpires &&
        typeof token.accessTokenExpires === 'number' &&
        Date.now() < token.accessTokenExpires
      ) {
        return token;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.twitterId = token.twitterId as string;
        session.user.twitterUsername = token.twitterUsername as string;
      }

      // Add tokens to session
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.twitterAccessToken = token.twitterAccessToken as string;
      session.twitterAccessSecret = token.twitterAccessSecret as string;

      return session;
    },
  },
  trustHost: true,
});
