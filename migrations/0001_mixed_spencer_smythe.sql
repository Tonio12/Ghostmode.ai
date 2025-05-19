ALTER TABLE "users" DROP CONSTRAINT "users_twitter_id_unique";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "twitter_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "twitter_username";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "twitter_access_token";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "twitter_access_secret";