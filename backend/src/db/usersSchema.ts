import { sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  timestamp,
  json,
  integer,
} from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createUpdateSchema,
  createSelectSchema,
} from "drizzle-zod";

// Drizzle ORM schema
export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(), // Full name of the user
  email: varchar("email", { length: 255 }).notNull(), // Email address
  password: varchar("password", { length: 255 }).notNull(), // Hashed password
  profileImg: varchar("profile_img", { length: 500 }).default(sql`null`), // Optional profile image URL
  bio: text("bio").default(sql`null`), // Optional short bio
  role: varchar("role", { length: 50 }).default("customer").notNull(), // Role: customer, admin, etc.
  phone: varchar("phone", { length: 15 }).default(sql`null`), // Optional phone number
  isActive: boolean("is_active").default(true).notNull(), // Account status
  // addresses: json("addresses").default(null), // JSON array for addresses
  createdAt: timestamp("created_at").defaultNow().notNull(), // Account creation timestamp
  updatedAt: timestamp("updated_at").defaultNow().notNull(), // Last updated timestamp
});

export const createUserSchema = createInsertSchema(usersTable).omit({
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
});
export const updateUserSchema = createUpdateSchema(usersTable).omit({
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
});

// Login
export const loginUserSchema = createSelectSchema(usersTable).pick({
  email: true,
  password: true,
});

//address schema
export const addressesTable = pgTable("addresses", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  street: varchar("street", { length: 255 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  zip: varchar("zip", { length: 20 }).notNull(),
});
