import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import {
  deleteProduct,
  getProductById,
  insertProduct,
  listOfProducts,
  updateProduct,
  updateProductImages,
} from "./productsController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import {
  insertProductSchema,
  updateProductSchema,
} from "../../db/productsSchema.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { verifyAuthorizaion } from "../../middlewares/authorizationMiddleware.js";
import { upload } from "../../middlewares/multerMiddleware.js";
import multer from "multer";

// Middleware to handle multer errors
const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload.array("productImgs")(req, res, (err) => {
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

const router = Router();

router.get("/", listOfProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  verifyToken,
  verifyAuthorizaion,
  
  validateData(insertProductSchema),
  insertProduct
);

router.put(
  "/upload/:id",
  verifyToken,
  verifyAuthorizaion,
  uploadMiddleware,
  updateProductImages
);

router.put(
  "/:id",
  verifyToken,
  verifyAuthorizaion,
  validateData(updateProductSchema),
  updateProduct
);
router.delete("/:id", verifyToken, verifyAuthorizaion, deleteProduct);

export default router;
