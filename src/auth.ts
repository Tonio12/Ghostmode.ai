import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { signInSchema } from "./lib/validation";
import db from "./db";
import { users } from "./db/schema";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { config } from "./lib/config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: config.env.google.id,
      clientSecret: config.env.google.secret,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send openid email profile",
        },
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
          const validatedCredentials =
            await signInSchema.parseAsync(credentials);
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
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // If the URL starts with the base URL, just use it
      if (url.startsWith(baseUrl)) return url;
      // After sign in, redirect to home
      return `${baseUrl}/home`;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }

      return session;
    },
  },
  trustHost: true,
});
