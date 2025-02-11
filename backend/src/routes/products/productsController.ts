import { Request, Response } from "express";
import { db } from "../../db/index.js";
import { insertProductSchema, productsTable } from "../../db/productsSchema.js";
import { between, count, desc, eq, inArray } from "drizzle-orm";
import _ from "lodash";
import { and, gte, lte, ilike, sql} from "drizzle-orm";
import { uploadOnCloudinary } from "../../../utils/cloudinary.js"

const listOfProducts = async (req:Request, res:Response) => {
  try {
    const { page = 1, pageSize = 6 } = req.query;

    const categories = req.query.categories
      ? JSON.parse(req.query.categories)
      : [];
    const colors = req.query.colors ? JSON.parse(req.query.colors) : [];
    const sizes = req.query.sizes ? JSON.parse(req.query.sizes) : [];
    const genderAndAgeCategories = req.query.genderAndAgeCategories
      ? JSON.parse(req.query.genderAndAgeCategories)
      : [];
    const brands = req.query.brands ? JSON.parse(req.query.brands) : [];
    const priceRange = req.query.priceRange
      ? JSON.parse(req.query.priceRange)
      : [];
    // console.log(
    //   categories, //[shirt tops]
    //   colors, //[red,blue]
    //   sizes, //[S,M,XL]
    //   genderAndAgeCategories, //[Men,woman]
    //   brands, //[Nike,punna]
    //   priceRange //[0-2000]
    // );

    //next task begins from here...
    const conditions: string | any[] = [];

    if (colors.length) {
      colors.forEach((color) => {
        conditions.push(
          sql`EXISTS (
            SELECT 1 FROM jsonb_array_elements_text(${productsTable.color}::jsonb) AS elem
            WHERE LOWER(elem) = LOWER(${color})
          )`
        );
      });
    }

    if (sizes.length) {
      sizes.forEach((size) => {
        conditions.push(
          sql`EXISTS (
            SELECT 1 FROM jsonb_array_elements_text(${productsTable.size}::jsonb) AS size_elem
            WHERE LOWER(size_elem) = LOWER(${size})
          )`
        );
      });
    }

    if (genderAndAgeCategories.length) {
      conditions.push(
        sql`LOWER(${productsTable.category}) = ANY(ARRAY[${sql.join(
          genderAndAgeCategories.map((cat) => sql`${cat.toLowerCase()}`),
          sql`, `
        )}]::text[])`
      );
    }

    if (categories.length) {
      conditions.push(
        sql`LOWER(${productsTable.subcategory}) = ANY(
          ARRAY[${sql.join(
            categories.map((cat) => sql`${cat.toLowerCase()}`),
            sql`, `
          )}]::text[]
        )`
      );
    }

    if (brands.length) {
      conditions.push(
        sql`LOWER(${productsTable.brand}) = ANY(
          ARRAY[${sql.join(
            brands.map((brand) => sql`${brand.toLowerCase()}`),
            sql`, `
          )}]::text[]
        )`
      );
    }

    if (priceRange.length) {
      console.log("price range", priceRange);

      console.log(
        priceRange[0].split("-")[0], // min price
        priceRange[0].split("-")[0]
      );

      conditions.push(
        between(
          productsTable.price,
          Number(priceRange[0].split("-")[0]), // min price
          Number(priceRange[0].split("-")[1]) // max price
        )
      );
    }

    const productsList = await db.query.productsTable.findMany({
      where: conditions.length ? and(...conditions) : undefined,
      orderBy: (products, { asc }) => asc(products.id),
      limit: Number(pageSize),
      offset: (Number(page) - 1) * Number(pageSize),
    });

    const totalProductsCount = await db
      .select({ count: count() })
      .from(productsTable);
    // console.log(productsList);

    res.status(200).json({
      totalProductsCount: totalProductsCount[0].count,
      productsList,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: err.message });
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
    req.cleanBody = _.pick(
      { ...req.body },
      Object.keys(insertProductSchema.shape)
    );

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

const updateProductImages = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;

    // Upload images to Cloudinary in parallel
    const productImgs = await Promise.all(
      req.files ? req.files.map((file) => uploadOnCloudinary(file.path || "")) : []
    );

    // Update product in the database
    const [product] = await db
      .update(productsTable)
      .set({ images: productImgs }) // Ensure 'images' field matches your DB schema
      .where(eq(productsTable.id, id))
      .returning();

    if (!product) {
      res.status(404).json({ message: "Product not found", status: 404 });
      return
    }

    res.status(200).json({
      message: "Product updated successfully",
      status: 200, // Changed from 204 to 200
      product,
    });

  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Failed to update product", status: 500 });
  }
};




export {
  listOfProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
  updateProductImages
};
