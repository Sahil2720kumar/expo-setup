import {
  boolean,
  doublePrecision,
  integer,
  json,
  numeric,
  pgTable,
  real,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { type InferSelectModel  } from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
 
export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  category: varchar({ length: 255 }).notNull(),
  subcategory: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  price: doublePrecision().notNull(),
  size: json().notNull(), // Array of sizes, e.g., ["S", "M", "L", "XL"]
  color: json().notNull(), // Array of colors, e.g., ["White", "Black", "Blue"]
  inStock: boolean().notNull(),
  images: json().notNull(), // Array of image file names
  rating: real().notNull(), // Floating-point rating, e.g., 4.5
});

// using Drizzle createInsertSchema to create Zod schema (products)
export const insertProductSchema = createInsertSchema(productsTable).omit({})
export const updateProductSchema = createUpdateSchema(productsTable).omit({})


export type ProductType = InferSelectModel<typeof productsTable>; // Represents a row in the table
 
