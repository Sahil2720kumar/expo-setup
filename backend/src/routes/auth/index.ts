import { Router } from "express";
import { loginUser, registerUser } from "./authController";
import { createUserSchema, loginUserSchema } from "../../db/usersSchema";
import { validateData } from "../../middlewares/validationMiddleware";

const router = Router();

router.post("/register",validateData(createUserSchema), registerUser);

router.post("/login",validateData(loginUserSchema), loginUser);

export default router;
