import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { db } from "../../db/index.js";
import { users } from "../../db/usersSchema.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const data = req.cleanBody;
    const hashedPassword = await bcrypt.hashSync(
      data.password,
      Number(process.env.BCRYPT_SALT)
    );

    const [emailAlreadyExist] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));

    if (emailAlreadyExist) {
      res.status(400).json({ message: "Email already exists", status: 400 });
      return;
    }

    const [user] = await db
      .insert(users)
      .values({ ...data, password: hashedPassword })
      .returning();

    //@ts-ignore
    delete user["password"];

    res.status(201).json({
      message: "User created successfull",
      status: 201,
      created_user: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to created user", status: 500 });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.cleanBody;

    // Fetch user and validate
    const [userExist] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!userExist || !bcrypt.compareSync(password, userExist.password)) {
      res.status(401).json({ message: "Invalid credentials", status: 401 });
      return; // End the function after sending the response
    }

    //create jwt token
    const token = jwt.sign(
      { userId: userExist.id, role: userExist.role },
      process.env.JWT_SECRET_TOKEN!,
      { expiresIn: "7d" }
    );

    //@ts-ignore
    delete userExist["password"];

    // If the password matches, proceed with login success
    res
      .status(200)
      .json({
        message: "Login successful",
        status: 200,
        token,
        user: userExist,
      });
  } catch (error) {
    res.status(500).json({ message: "Failed to login user", status: 500 });
  }
};
