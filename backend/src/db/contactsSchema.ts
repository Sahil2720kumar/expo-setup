import { sql } from "drizzle-orm";
import { pgTable, serial, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const contactsTable = pgTable("contacts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  message: text("message"),
  contactImg: varchar("contact_img", { length: 500 }).default(sql`null`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema=createInsertSchema(contactsTable).omit({})
