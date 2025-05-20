ALTER TABLE "users" ADD COLUMN "twitter_id" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "twitter_username" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "twitter_access_token" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "twitter_refresh_token" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "twitter_access_token_expires" timestamp with time zone;