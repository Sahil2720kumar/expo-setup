import {
  date,
  decimal,
  doublePrecision,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { usersTable } from "./usersSchema";
import { productsTable } from "./productsSchema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";


export const ordersTable = pgTable("orders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => usersTable.id),
  orderDate: date("order_date").defaultNow().notNull(),
  paymentMethod: varchar("payment_method", { length: 100 }).default("Cash on Delivery").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
});


export const orderItemsTable = pgTable("order_items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer("order_id")
  .notNull()
  .references(() => ordersTable.id),
  productId: integer("product_id")
  .notNull()
  .references(() => productsTable.id),
  quantity: integer("quantity").default(1).notNull(),
  status: varchar("status", { length: 50 }).default("pending").notNull(),
  price: doublePrecision().notNull(),
  deliveryDate: date("delivery_date").default(sql`null`),
});

export const insertOrderSchema=createInsertSchema(ordersTable).omit({
    customerId:true,
    orderDate:true,
    paymentMethod:true,
    totalAmount:true
})

export const insertOrderItemSchema=createInsertSchema(orderItemsTable).omit({
  status:true,
  orderId:true,
  deliveryDate:true,
  price:true
})


export const insertOrderWithItemsSchema=z.object({
  order:insertOrderSchema,
  items:z.array(insertOrderItemSchema)
})
