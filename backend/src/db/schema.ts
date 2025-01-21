import {
  boolean,
  integer,
  json,
  numeric,
  pgTable,
  real,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  category: varchar({ length: 255 }).notNull(),
  subcategory: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  price: numeric({ precision: 10, scale: 2 }).notNull(),
  size: json().notNull(), // Array of sizes, e.g., ["S", "M", "L", "XL"]
  color: json().notNull(), // Array of colors, e.g., ["White", "Black", "Blue"]
  inStock: boolean().notNull(),
  images: json().notNull(), // Array of image file names
  rating: real().notNull(), // Floating-point rating, e.g., 4.5
});
