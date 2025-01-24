CREATE TABLE "products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"category" varchar(255) NOT NULL,
	"subcategory" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"price" double precision NOT NULL,
	"size" json NOT NULL,
	"color" json NOT NULL,
	"inStock" boolean NOT NULL,
	"images" json NOT NULL,
	"rating" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"profile_img" varchar(500) DEFAULT null,
	"bio" text DEFAULT null,
	"role" varchar(50) DEFAULT 'customer' NOT NULL,
	"phone" varchar(15) DEFAULT null,
	"is_active" boolean DEFAULT true NOT NULL,
	"addresses" json DEFAULT 'null'::json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
