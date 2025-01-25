ALTER TABLE "order_items" ALTER COLUMN "delivery_date" SET DEFAULT null;--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "delivery_date" DROP NOT NULL;