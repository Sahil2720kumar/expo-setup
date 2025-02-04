import { Router } from "express";
import {
  getAddressById,
  getAllUsers,
  getUserById,
  insertAddress,
  listOfAddresses,
  updateAddress,
  updateUser
} from "./usersController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { insertAddressSchema, updateAddressSchema, updateUserSchema } from "../../db/usersSchema.js";
import { verifyAuthorizaion } from "../../middlewares/authorizationMiddleware.js";
import { upload } from "../../middlewares/multerMiddleware.js";
import multer from "multer";
import { Request, Response, NextFunction } from "express";

const router = Router();

// Middleware to handle multer errors
const uploadMiddleware = (req:Request, res:Response, next:NextFunction) => {
  upload.single("profileImg")(req, res, (err) => {
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

//users routes
router.get("/",verifyToken,verifyAuthorizaion,getAllUsers)
router.get("/:userId",verifyToken,getUserById)
router.put("/:userId", verifyToken, uploadMiddleware, validateData(updateUserSchema), updateUser);



//Address routes
router.get("/:userId/addresses", verifyToken, listOfAddresses);
router.get("/:userId/addresses/:addressId", verifyToken, getAddressById);
router.post(
  "/:userId/addresses",
  verifyToken,
  validateData(insertAddressSchema),
  insertAddress
);
router.put(
  "/:userId/addresses/:addressId",
  verifyToken,
  validateData(updateAddressSchema),
  updateAddress
);

export default router;
