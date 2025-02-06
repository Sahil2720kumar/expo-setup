CREATE TABLE "contacts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "contacts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "contacts_email_unique" UNIQUE("email")
);
