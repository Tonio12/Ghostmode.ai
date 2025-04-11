import { date, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users',{
    id: uuid('id').notNull().primaryKey().unique().defaultRandom(),
    fullName: varchar('full_name').notNull(),
    email: text('email').notNull().unique(),
    password: varchar('password').notNull(),
    lastActivityDate: date('last_activity_date').defaultNow().notNull(),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow().notNull()

})