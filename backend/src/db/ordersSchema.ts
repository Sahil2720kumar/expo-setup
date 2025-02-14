import {
  date,
  decimal,
  doublePrecision,
  integer,
  pgTable,
  serial,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { addressesTable, usersTable } from "./usersSchema.js";
import { productsTable } from "./productsSchema.js";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations, sql } from "drizzle-orm";
import { type InferSelectModel } from "drizzle-orm";

export const ordersTable = pgTable("orders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  customerId: uuid("customer_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  orderDate: date("order_date").defaultNow().notNull(),
  addressId: integer("address_id")
    .notNull()
    .references(() => addressesTable.id, {
      onDelete: "cascade",
    }),
  paymentMethod: varchar("payment_method", { length: 100 })
    .default("Cash on Delivery")
    .notNull(),
  // 🔹 Razorpay Order ID (optional, used for online payments)
  razorpayOrderId: varchar("razorpay_order_id", { length: 255 }),

  // 🔹 Razorpay Payment ID (only if payment is successful)
  razorpayPaymentId: varchar("razorpay_payment_id", { length: 255 }),

  // 🔹 Razorpay Signature (for verification)
  razorpaySignature: varchar("razorpay_signature", { length: 255 }),

  // 🔹 Order status (e.g., PAID, PENDING, FAILED)
  status: varchar("status", { length: 50 }).default("PENDING").notNull(),

  // 🔹 Total amount of the order
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
      onUpdate: "cascade",
    }),

  quantity: integer("quantity").default(1).notNull(),

  status: varchar("status", { length: 50 }).default("pending").notNull(),
  color: varchar("color", { length: 50 }).default(sql`null`),
  size: varchar("size", { length: 50 }).default("M").notNull(),
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

//relationships
export const ordersTableRelations = relations(ordersTable, ({ one, many }) => ({
  orderItems: many(orderItemsTable),
  address: one(addressesTable, {
    fields: [ordersTable.addressId],
    references: [addressesTable.id],
  }),
}));

export const orderItemsTableRelations = relations(
  orderItemsTable,
  ({ one }) => ({
    order: one(ordersTable, {
      fields: [orderItemsTable.orderId],
      references: [ordersTable.id],
    }),
    product: one(productsTable, {
      fields: [orderItemsTable.productId],
      references: [productsTable.id],
    }),
  })
);
