import { Request, Response } from "express";
import { db } from "../../db/index.js";
import { insertProductSchema, productsTable } from "../../db/productsSchema.js";
import { count, desc, eq } from "drizzle-orm";
import _ from "lodash";
import products from "./index.js";

const listOfProducts = async (req: Request, res: Response) => {
  try {
    const { page, pageSize } = req.query;
    // console.log({ page, pageSize });

    const productsList = await db.query.productsTable.findMany({
      orderBy: (users, { asc }) => asc(productsTable.id),
      limit: Number(pageSize),
      offset: (Number(page) - 1) * Number(pageSize),
    });
     
    const totalProductsCount = await db.select({ count: count() }).from(productsTable);
     
    res.status(200).json({totalProductsCount:totalProductsCount[0].count,productsList});
  } catch (err) {
    // console.log(err);
    
    res
      .status(500)
      .json({ message: "Failed to fetch all the productsTable", status: 500 });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(req.params.id)));

    if (!product) {
      res.status(404).json({ message: "Product not found", status: 404 });
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch a product", status: 500 });
  }
};

const insertProduct = async (req: Request, res: Response) => {
  try {
    // console.log(req.userId)
    const [newInsertedProduct] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning();

    res.status(201).json(newInsertedProduct);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create a product", status: 500 });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;
    const [product] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, id))
      .returning();

    if (!product) {
      res.status(404).json({ message: "Product not found", status: 404 });
    } else {
      res.status(200).json({
        message: "Product updated successfull",
        status: 204,
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to update a product", status: 500 });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();

    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found", status: 404 });
    } else {
      res.status(200).json({
        message: "Product deleted successfull",
        status: 204,
        //   deleteProduct,
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete a product", status: 500 });
  }
};

export {
  listOfProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
};
