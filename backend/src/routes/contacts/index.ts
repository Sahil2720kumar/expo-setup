import { Router } from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { verifyAuthorizaion } from "../../middlewares/authorizationMiddleware.js";
import { upload } from "../../middlewares/multerMiddleware.js";
import multer from "multer";
import { Request, Response, NextFunction } from "express";
import { insertContactSchema } from "../../db/contactsSchema.js";
import { insertContact } from "./contactsController.js";

const router = Router();

// Middleware to handle multer errors
const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload.single("contactImg")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Handle Multer-specific errors (e.g., file size exceeded)
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // Handle general errors (e.g., invalid file type)
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

router.post("/", uploadMiddleware,insertContact);

export default router;
