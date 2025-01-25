import { Router } from "express";
import { loginUser, registerUser } from "./authController.js";
import { createUserSchema, loginUserSchema } from "../../db/usersSchema.js";
import { validateData } from "../../middlewares/validationMiddleware.js";

const router = Router();

router.post("/register",validateData(createUserSchema), registerUser);

router.post("/login",validateData(loginUserSchema), loginUser);

export default router;
