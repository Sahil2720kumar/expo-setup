import {
  date,
  decimal,
  doublePrecision,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { usersTable } from "./usersSchema.js";
import { productsTable } from "./productsSchema.js";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";
import { type InferSelectModel } from "drizzle-orm";

export const ordersTable = pgTable("orders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  orderDate: date("order_date").defaultNow().notNull(),
  paymentMethod: varchar("payment_method", { length: 100 })
    .default("Cash on Delivery")
    .notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
});

export const orderItemsTable = pgTable("order_items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer("order_id")
    .notNull()
    .references(() => ordersTable.id, {
      onDelete: "cascade",
    }),
  productId: integer("product_id")
    .notNull()
    .references(() => productsTable.id, {
      onDelete: "cascade",
    }),
  quantity: integer("quantity").default(1).notNull(),
  status: varchar("status", { length: 50 }).default("pending").notNull(),
  price: doublePrecision().notNull(),
  deliveryDate: date("delivery_date").default(sql`null`),
});

//Table types
export type OrderItemsType = InferSelectModel<typeof orderItemsTable>;

export const insertOrderSchema = createInsertSchema(ordersTable).omit({
  customerId: true,
  orderDate: true,
  paymentMethod: true,
  totalAmount: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItemsTable).omit({
  status: true,
  orderId: true,
  deliveryDate: true,
  price: true,
});

export const insertOrderWithItemsSchema = z.object({
  order: insertOrderSchema,
  items: z.array(insertOrderItemSchema),
});
