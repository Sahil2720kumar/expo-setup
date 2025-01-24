import { Request, Response } from "express";
import { db } from "../../db/index";
import { insertProductSchema, products } from "../../db/productsSchema";
import { eq } from "drizzle-orm";
import _ from "lodash"

const listOfProducts = async (req: Request, res: Response) => {
  try {
    const productsList = await db.select().from(products);
    res.status(200).json(productsList);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch all the products", status: 500 });
  }
};


const getProductById = async (req: Request, res: Response) => {
  try {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, Number(req.params.id)));

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
      .insert(products)
      .values(req.cleanBody)
      .returning();

    res.status(201).json(newInsertedProduct);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create a product", status: 500 });
  }
};


const updateProduct = async(req: Request, res: Response) => {
   try {
      const id = Number(req.params.id);
      const updatedFields=req.cleanBody
      const [product] = await db.update(products).set(updatedFields).where(eq(products.id,id)).returning()
  
     
      if (!product) {
        res.status(404).json({ message: "Product not found", status: 404 });
      } else {
        res.status(200).json({
          message: "Product updated successfull",
          status: 204,
        });
      }
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ message: "Failed to update a product", status: 500 });
    }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const [deletedProduct] = await db
      .delete(products)
      .where(eq(products.id, id))
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
