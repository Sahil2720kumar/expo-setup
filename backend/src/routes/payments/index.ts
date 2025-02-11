import { Router } from "express";
import { createRazorpayOrder, webhookPayment } from "./paymentsController";
import { verifyToken } from "../../middlewares/authMiddleware";

const router = Router();

// Middleware to handle multer errors

router.post("/create",verifyToken, createRazorpayOrder);
router.post("/verfication", webhookPayment);

export default router;
 