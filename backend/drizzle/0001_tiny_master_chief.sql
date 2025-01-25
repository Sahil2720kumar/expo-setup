ALTER TABLE "users" ALTER COLUMN "profile_img" SET DEFAULT null;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "bio" SET DEFAULT null;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "phone" SET DEFAULT null;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "addresses";