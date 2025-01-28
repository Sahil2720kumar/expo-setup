import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

export const verifyAuthorizaion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")!;

  try {
    //decode jwt take data
    const decoded = Jwt.verify(token, process.env.JWT_SECRET_TOKEN!);

    if (typeof decoded !== "object" ||decoded?.role !== "admin") {
      res.status(401).json({ error: "You don't have permission!" });
      return;
    }

    next();
  } catch (err) {
    res.status(401).json({ error: "Access denied" });
  }
};
