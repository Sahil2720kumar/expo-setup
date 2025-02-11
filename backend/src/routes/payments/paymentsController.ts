import { Request, Response, NextFunction } from "express";
import { db } from "../../db";
import { productsTable } from "../../db/productsSchema";
import { eq } from "drizzle-orm";
import razorpay from "../../../config/razorpay.config";
import crypto from "crypto";
import { ordersTable } from "../../db/ordersSchema";

export const createRazorpayOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;
    console.log("orderid", orderId);

    //find product from the db
    const [order] = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, Number(orderId)));
    if (!order) {
      res.status(404).json({
        message: "Order not found",
        status: 404,
      });
      return;
    }
    console.log("backend", order);

    // Convert amount to paise (Razorpay uses the smallest currency unit)
    const options = {
      amount: Number(order.totalAmount) * 100, //amount in smallest currency unit
      currency: "INR",
      // reciept: `order_rcpt_${Date.now()}`,
    };

    // Create order in Razorpay
    const razorpayOrder = await razorpay.orders.create(options);
    console.log(razorpayOrder);

    // ✅ Save `razorpay_order_id` in the database
    const testOrder = await db
      .update(ordersTable)
      .set({ razorpayOrderId: razorpayOrder.id })
      .where(eq(ordersTable.id, Number(orderId)))
      .returning();
    console.log(testOrder);

    res.status(200).json({
      message: "Razorpay order created successfully",
      status: 200,
      success: true,
      razorpayOrderId:razorpayOrder.id,
      totalAmount:razorpayOrder.amount
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create razorpay order",
      success: false,
      status: 500,
    });
  }
};

export const webhookPayment = async (req: Request, res: Response) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
    // console.log(req);
    console.log("here webhook inside");

  

    // ✅ Verify webhook signature
    const signature = req.headers["x-razorpay-signature"] as string;
    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("Invalid Razorpay Webhook Signature");
      return res.status(400).json({ message: "Invalid signature" });
    }

    // ✅ Process Payment Capture Event
    const event = req.body;
    if (event.event === "payment.captured") {
      const { order_id, id:payment_id, amount } = event.payload.payment.entity;

      // ✅ Find order by Razorpay Order ID
      const [order] = await db
        .select()
        .from(ordersTable)
        .where(eq(ordersTable.razorpayOrderId, order_id));
      if (!order) {
        console.error("Order not found for Razorpay Order ID:", order_id);
        return res.status(404).json({ message: "Order not found" });
      }

      // ✅ Update order status to "Paid"
      await db
        .update(ordersTable)
        .set({ status:'order confirmed',paymentMethod:"online", razorpayPaymentId: payment_id,razorpaySignature:signature })
        .where(eq(ordersTable.id, order.id));

      console.log(`✅ Order ${order.id} payment successful!`);
    }

    res.status(200).json({ message: "Webhook received" });
  } catch (err) {
    console.error("Webhook Error:", err);
    res.status(500).json({ message: "Webhook processing failed" });
  }
};
