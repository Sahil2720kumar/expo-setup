import { Router } from "express";
import {
  getAddressById,
  getAllUsers,
  getUserById,
  insertAddress,
  listOfAddresses,
  updateAddress,
  updateUser,
} from "./usersController";
import { verifyToken } from "../../middlewares/authMiddleware";
import { validateData } from "../../middlewares/validationMiddleware";
import { insertAddressSchema, updateAddressSchema, updateUserSchema } from "../../db/usersSchema";
import { verifyAuthorizaion } from "../../middlewares/authorizationMiddleware";

const router = Router();


//users routes
router.get("/",verifyToken,verifyAuthorizaion,getAllUsers)
router.get("/:userId",verifyToken,getUserById)
router.put("/:userId",verifyToken,validateData(updateUserSchema),updateUser)




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
