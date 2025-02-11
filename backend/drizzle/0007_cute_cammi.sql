ALTER TABLE "order_items" ADD COLUMN "color" varchar(50) DEFAULT null;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "size" varchar(50) DEFAULT 'M' NOT NULL;