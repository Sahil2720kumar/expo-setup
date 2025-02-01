import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ message: "Access denied" });
    return;
  }
  try {
    //decode jwt take data
    const decoded = Jwt.verify(token, process.env.JWT_SECRET_TOKEN!);

    if (typeof decoded !== "object" || !decoded?.userId) {
      res.status(401).json({ message: "Access denied" });
      return;
    }


    req.userId = decoded.userId;
    req.role=decoded.role
    next();
  } catch (err) {
    res.status(401).json({ message: "Access denied" });
  }
};
