CREATE TABLE "products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"category" varchar(255) NOT NULL,
	"subcategory" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"size" json NOT NULL,
	"color" json NOT NULL,
	"inStock" boolean NOT NULL,
	"images" json NOT NULL,
	"rating" real NOT NULL
);
