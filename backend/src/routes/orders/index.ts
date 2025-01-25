import { Router } from "express";
import { insertOrder } from "./ordersController.js";
import { insertOrderSchema, insertOrderWithItemsSchema } from "../../db/ordersSchema.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router=Router()

router.post("/",verifyToken,validateData(insertOrderWithItemsSchema),insertOrder)

export default router;