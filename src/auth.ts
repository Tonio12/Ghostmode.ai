import NextAuth, { DefaultSession, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
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
    user?: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
    } & DefaultSession['user'];
  }

  interface JWT {
    id?: string;
    name?: string;
    accessToken?: string;
    refreshToken?: string;
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
  Credentials({
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error('Please enter your email and password');
      }

      try {
        const validatedCredentials = await signInSchema.parseAsync(credentials);
        const { email, password } = validatedCredentials;

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!user.length) {
          throw new Error('No user found with this email');
        }

        const isValidPassword = await compare(password, user[0].password);

        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        return {
          id: user[0].id.toString(),
          email: user[0].email.toString(),
          name: user[0].fullName.toString(),
        } as User;
      } catch (error) {
        console.error('Auth error:', error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error('An error occurred during sign in');
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
      }

      // Add tokens to session
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;

      return session;
    },
  },
  trustHost: true,
});
