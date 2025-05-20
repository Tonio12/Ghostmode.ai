import {
  pgTable,
  text,
  timestamp,
  varchar,
  primaryKey,
} from 'drizzle-orm/pg-core';

// NextAuth.js Drizzle Adapter default schema
export const authUsers = pgTable('auth_user', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: text('name'),
  email: varchar('email', { length: 255 }).unique(),
  emailVerified: timestamp('email_verified', { withTimezone: true }),
  image: text('image'),
});

export const accounts = pgTable(
  'account',
  {
    userId: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => authUsers.id),
    type: varchar('type', { length: 255 }).notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('provider_account_id', {
      length: 255,
    }).notNull(),
    refreshToken: text('refresh_token'),
    accessToken: text('access_token'),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
    tokenType: varchar('token_type', { length: 255 }),
    scope: text('scope'),
    idToken: text('id_token'),
    sessionState: text('session_state'),
  },
  (table) => ({
    pk: primaryKey(table.provider, table.providerAccountId),
  })
);

export const sessions = pgTable('session', {
  sessionToken: varchar('session_token', { length: 255 }).primaryKey(),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => authUsers.id),
  expires: timestamp('expires', { withTimezone: true }).notNull(),
});

export const verificationTokens = pgTable(
  'verification_token',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { withTimezone: true }).notNull(),
  },
  (table) => ({
    pk: primaryKey(table.identifier, table.token),
  })
);
