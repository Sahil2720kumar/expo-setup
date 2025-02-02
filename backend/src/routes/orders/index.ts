import { Router } from "express";
import { getOrderById, insertOrder, listOfOrders } from "./ordersController.js";
import { insertOrderSchema, insertOrderWithItemsSchema } from "../../db/ordersSchema.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router=Router()

router.post("/",verifyToken,validateData(insertOrderWithItemsSchema),insertOrder)
router.get("/",verifyToken,listOfOrders)
router.get("/:orderId/:productId",verifyToken,getOrderById)

export default router;