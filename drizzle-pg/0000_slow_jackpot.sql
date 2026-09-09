CREATE TABLE "access_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"phone" text NOT NULL,
	"display_name" text NOT NULL,
	"role" text DEFAULT 'provider' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "access_users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "providers" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"business_name" text NOT NULL,
	"phone" text NOT NULL,
	"vehicle_type" text NOT NULL,
	"status" text DEFAULT 'offline' NOT NULL,
	"latitude" double precision,
	"longitude" double precision,
	"updated_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"type" text NOT NULL,
	"company" text NOT NULL,
	"origin" text NOT NULL,
	"destination" text DEFAULT '—' NOT NULL,
	"distance" double precision DEFAULT 0 NOT NULL,
	"price" integer NOT NULL,
	"status" text DEFAULT 'Disponible' NOT NULL,
	"provider_name" text,
	"eta" integer,
	"created_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "services_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" text NOT NULL,
	"created_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "sessions_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "providers" ADD CONSTRAINT "providers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_access_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."access_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_providers_status" ON "providers" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_services_status_created" ON "services" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "idx_sessions_user_expires" ON "sessions" USING btree ("user_id","expires_at");