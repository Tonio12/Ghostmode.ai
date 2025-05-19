CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar NOT NULL,
	"email" text NOT NULL,
	"password" varchar NOT NULL,
	"last_activity_date" date DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"twitter_id" text,
	"twitter_username" varchar,
	"twitter_access_token" text,
	"twitter_access_secret" text,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_twitter_id_unique" UNIQUE("twitter_id")
);
