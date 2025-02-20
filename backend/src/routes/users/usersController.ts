import { Request, Response } from "express";
import { db } from "../../db/index.js";
import {
  addressesTable,
  updateUserSchema,
  usersTable,
} from "../../db/usersSchema.js";
import { asc, eq, getTableColumns } from "drizzle-orm";
import bcrypt from "bcryptjs";
import _ from "lodash";
import { uploadOnCloudinary } from "../../../utils/cloudinary.js";

export const listOfAddresses = async (req: Request, res: Response) => {
  try {
    // console.log("user role: ", req.role);

    const addressesList = await db
      .select()
      .from(addressesTable)
      .where(eq(addressesTable.userId, req.userId!))
      .orderBy(asc(addressesTable.id));

    res.status(200).json(addressesList);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch all the addresses", status: 500 });
  }
};

export const getAddressById = async (req: Request, res: Response) => {
  try {
    const { addressId } = req.params;

    const [address] = await db
      .select()
      .from(addressesTable)
      .where(eq(addressesTable.id, Number(addressId)));

    if (!address) {
      res.status(404).json({ message: "Address not found", status: 404 });
      return;
    }

    res.status(200).json(address);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch a address", status: 500 });
  }
};

export const insertAddress = async (req: Request, res: Response) => {
  try {
    const [newInsertedAddress] = await db
      .insert(addressesTable)
      .values({ ...req.cleanBody, userId: req.userId })
      .returning();
    res.status(200).json(newInsertedAddress);
  } catch (err) {
    console.log(err);

    res
      .status(500)
      .json({ message: "Failed to insert the address", status: 500 });
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const { addressId } = req.params;
    const updatedFields = req.cleanBody;
    const [address] = await db
      .update(addressesTable)
      .set(updatedFields)
      .where(eq(addressesTable.id, Number(addressId)))
      .returning();

    if (!address) {
      res.status(404).json({ message: "Address not found", status: 404 });
    } else {
      res.status(200).json({
        message: "Address updated successfull",
        status: 204,
      });
    }
  } catch (err) {
    // console.log(err);
    res
      .status(500)
      .json({ message: "Failed to update a address", status: 500 });
  }
};

//Users Controllers

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    //  console.log("user role: ", req.role);
    const { password, ...rest } = getTableColumns(usersTable);

    // const allUsers = await db.select({ ...rest }).from(usersTable);
    const allUsers = await db.query.usersTable.findMany({
      columns: {
        password: false,
      },
      with: {
        addresses: true,
      },
    });

    res.status(200).json(allUsers);
  } catch (err) {
    // console.log(err);

    res
      .status(500)
      .json({ message: "Failed to fetch all the users", status: 500 });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { password, ...rest } = getTableColumns(usersTable);

    // const [user] = await db
    //   .select({ ...rest })
    //   .from(usersTable)
    //   .where(eq(usersTable.id, Number(userId)));

    //required
    // if(Number(userId)!==req.userId){
    //   res.status(401).json({ message: "Something went wrong", status: 401 });
    //   console.log(userId,req.userId);
    //   return;
    // }

    const [user] = await db.query.usersTable.findMany({
      columns: {
        password: false,
      },
      with: {
        addresses: true,
      },
      where: (users, { eq }) => eq(users.id, userId),
    });

    if (!user) {
      res.status(404).json({ message: "User not found", status: 404 });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch a user", status: 500 });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    console.log(req.cleanBody);
       
    const { userId } = req.params;
    let updatedFields = req.cleanBody;
    const {oldPassword}={...req.body}

    // console.log(req.file);
     console.log("body", updatedFields,oldPassword);
    // console.log("paramsUserID", userId);
    // console.log("tokenUserId", req.userId);

    const profileImg = await uploadOnCloudinary(req.file?.path || "");
    // console.log(profileImg);

    if (updatedFields.password) {
      // console.log(updatedFields);
      const [userExist] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, req.userId!));
      
      if (!userExist || !bcrypt.compareSync(oldPassword, userExist.password)) {
        res.status(401).json({ message: "Old password incorrect, plz enter correct password", status: 401 });
        return; // End the function after sending the response
      }

      const hashedPassword = await bcrypt.hashSync(
        updatedFields.password,
        Number(process.env.BCRYPT_SALT)
      );
      updatedFields = { ...updatedFields, password: hashedPassword };
    }

    if (Number(req.userId === userId || req.role === "admin")) {
      let user;
      if (profileImg) {
        [user] = await db
          .update(usersTable)
          .set({
            ...updatedFields,
            profileImg: profileImg,
            updatedAt: new Date(),
          })
          .where(eq(usersTable.id, userId))
          .returning();
      } else {
        [user] = await db
          .update(usersTable)
          .set({ ...updatedFields, updatedAt: new Date() })
          .where(eq(usersTable.id, userId))
          .returning();
      }

      if (!user) {
        res.status(404).json({ message: "user not found", status: 404 });
        return;
      }

      res.status(200).json({
        message: "user updated successfull",
        status: 204,
        user,
      });
    } else {
      res
        .status(400)
        .json({ error: "Bad Request: Something went wrong with your input" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update a user", status: 500 });
  }
};
