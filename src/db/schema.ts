import {
  date,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().unique().defaultRandom(),
  fullName: varchar('full_name').notNull(),
  email: text('email').notNull().unique(),
  password: varchar('password').notNull(),
  lastActivityDate: date('last_activity_date').defaultNow().notNull(),
  twitterId: varchar('twitter_id'),
  twitterUsername: varchar('twitter_username'),
  twitterAccessToken: text('twitter_access_token'),
  twitterRefreshToken: text('twitter_refresh_token'),
  twitterAccessTokenExpires: timestamp('twitter_access_token_expires', {
    withTimezone: true,
  }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
