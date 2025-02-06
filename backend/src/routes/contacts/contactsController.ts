import { Request, Response, NextFunction } from "express";
import { contactsTable, insertContactSchema } from "../../db/contactsSchema";
import _ from "lodash";
import { uploadOnCloudinary } from "../../../utils/cloudinary";
import { db } from "../../db";

export const insertContact = async (req: Request, res: Response) => {
  try {
    console.log("here");

    req.cleanBody = _.pick(
      { ...req.body },
      Object.keys(insertContactSchema.shape)
    );

    let insertedFields = req.cleanBody;
    // console.log(insertedFields);
    // console.log(req.file);

    // console.log(req.file);

    const contactImage = await uploadOnCloudinary(req.file?.path || "");
    // console.log(profileImg);

    const [contact] = await db
      .insert(contactsTable)
      .values({ ...insertedFields, contactImg: contactImage })
      .returning();

    res.status(200).json({
      message: "message send successfully",
      status: 204,
      contact,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to send", status: 500 });
  }
};
