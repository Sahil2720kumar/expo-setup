import { Request, Response } from "express";
import {
  insertOrderItemSchema,
  ordersTable,
  orderItemsTable,
} from "../../db/ordersSchema.js";
import { db } from "../../db/index.js";
import _ from "lodash";
import { productsTable } from "../../db/productsSchema.js";
import { eq, inArray } from "drizzle-orm";

export const insertOrder = async (req: Request, res: Response) => {
  try {
    // console.log(req.cleanBody);
    const data = {
      order: { ...req.cleanBody.order, customerId: Number(req.userId) },
      items: req.cleanBody.items,
    };

    //Add price to each order item
    const productIds = data.items.map((product) => product.productId);
    const productsList = await db
      .select()
      .from(productsTable)
      .where(inArray(productsTable.id, productIds));

    function findProductPrice(productId: number) {
      const product = productsList.find((item) => productId === item.id);
      return product ? product.price : null; // Return the price or null if not found
    }

    const totalPrice = data.items.reduce((total: number, product) => {
      const productPrice = findProductPrice(product.productId);
      return total + (productPrice ?? 0) * product.quantity; // Multiply price by quantity
    }, 0); // Start with 0 as the initial total

    //Insert new order
    const [newInsertedOrder] = await db
      .insert(ordersTable)
      .values({ ...data.order, totalAmount: totalPrice })
      .returning();

    const orderItems = data.items.map((item) => {
      const clean_item = _.pick(item, Object.keys(insertOrderItemSchema.shape));
      return {
        ...clean_item,
        orderId: newInsertedOrder.id,
        price: findProductPrice(clean_item.productId),
      };
    });

    const newOrderItems = await db
      .insert(orderItemsTable)
      .values(orderItems)
      .returning();

    res.status(201).json({ ...newInsertedOrder, items: newOrderItems });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Failed to create a order", status: 500 });
  }
};

export const listOfOrders = async (req: Request, res: Response) => {
  try {
    if (req.role === "admin") {
      const orders = await db.select().from(ordersTable);
      res.status(200).json(orders);
      return;
    }

    const orders = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.customerId, Number(req.userId)));
    res.status(200).json(orders);
    
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to fetch all orders", status: 500 });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderWithItems = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, Number(req.params.id)))
      .leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId));

    if (orderWithItems.length === 0) {
      res.status(404).json({ message: "Order not found", status: 404 });
      return;
    }

    const orderItems = orderWithItems.map(({ orders, order_items }) => {
      return order_items;
    });

    res.status(200).json({ ...orderWithItems[0].orders, items: orderItems });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Failed to fetch a order", status: 500 });
  }
};
