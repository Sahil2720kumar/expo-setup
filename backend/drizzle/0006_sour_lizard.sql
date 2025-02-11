ALTER TABLE "orders" ADD COLUMN "razorpay_order_id" varchar(255);--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "razorpay_payment_id" varchar(255);--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "razorpay_signature" varchar(255);--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "status" varchar(50) DEFAULT 'PENDING' NOT NULL;