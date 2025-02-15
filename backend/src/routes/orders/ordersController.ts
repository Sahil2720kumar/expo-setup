import { Request, Response } from "express";
import {
  insertOrderItemSchema,
  ordersTable,
  orderItemsTable,
  OrderItemsType,
} from "../../db/ordersSchema.js";
import { db } from "../../db/index.js";
import _ from "lodash";
import { ProductType, productsTable } from "../../db/productsSchema.js";
import { desc, eq, inArray } from "drizzle-orm";

export const insertOrder = async (req: Request, res: Response) => {
  try {
    // console.log(req.cleanBody);
    const data = {
      order: { ...req.cleanBody.order, customerId: req.userId },
      items: req.cleanBody.items,
    };

    //Add price to each order item
    const productIds = data.items.map(
      (product: OrderItemsType) => product.productId
    );
    const productsList = await db
      .select()
      .from(productsTable)
      .where(inArray(productsTable.id, productIds));

    function findProductPrice(productId: number) {
      const product = productsList.find((item) => productId === item.id);
      return product ? product.price : null; // Return the price or null if not found
    }
 
    const totalPrice = data.items.reduce(
      (total: number, product: OrderItemsType) => {
        const productPrice = findProductPrice(product.productId);
        return total + (productPrice ?? 0) * product.quantity; // Multiply price by quantity
      },
      0
    ); // Start with 0 as the initial total

    //Insert new order
    const [newInsertedOrder] = await db
      .insert(ordersTable)
      .values({ ...data.order, totalAmount: totalPrice })
      .returning();

    const orderItems = data.items.map((item: OrderItemsType) => {
      const clean_item = _.pick(item, Object.keys(insertOrderItemSchema.shape));
      return {
        ...clean_item,
        orderId: newInsertedOrder.id,
        price: findProductPrice(clean_item.productId!),
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
      // const orders = await db.select().from(ordersTable);
      const orders = await db.query.ordersTable.findMany({
        with: {
          orderItems: {
            with: {
              product: {
                columns: {
                  name: true,
                  description: true,
                  images:true
                },
              },
            },
          },
        },
        orderBy: [desc(ordersTable.id)],
      });
      res.status(200).json(orders);
      return;
    }

    // const orders = await db
    //   .select()
    //   .from(ordersTable)
    //   .where(eq(ordersTable.customerId, req.userId!));
    const orders = await db.query.ordersTable.findMany({
      with: {
        orderItems: {
          with: {
            product: {
              columns: {
                name: true,
                description: true,
                images:true
              },
            },
          },
        },
      },
      orderBy: [desc(ordersTable.id)],
      where: (orders, { eq }) => eq(orders.customerId, req.userId!),
    });

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
    const orderId=Number(req.params.orderId)
    const productId=Number(req.params.productId)


    // const orderWithItems = await db
    //   .select()
    //   .from(ordersTable)
    //   .where(eq(ordersTable.id, Number(req.params.id)))
    //   .leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId));

    // const orderItems = orderWithItems.map(({ orders, order_items }) => {
    //   return order_items;
    // });
    const [orderWithItems] = await db.query.ordersTable.findMany({
      with: {
        address:true,
        orderItems: {
          where: (orderItems, { eq }) => eq(orderItems.productId, productId!),
          with: {
            product: {
              columns: {
                name: true,
                description: true,
                images:true
              },
            },
          },
        },
      },
      where: (orders, { eq }) => eq(orders.id, orderId!),
    });


    if (!orderWithItems) {
      res.status(404).json({ message: "Order not found", status: 404 });
      return;
    }

    // res.status(200).json({ ...orderWithItems[0].orders, items: orderItems });
    res.status(200).json(orderWithItems );
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Failed to fetch a order", status: 500 });
  }
};
