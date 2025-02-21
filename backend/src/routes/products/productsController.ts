import { Request, Response } from "express";
import { db } from "../../db/index.js";
import { insertProductSchema, productsTable } from "../../db/productsSchema.js";
import { between, count, desc, eq, inArray, or } from "drizzle-orm";
import _ from "lodash";
import { and, gte, lte, ilike, sql } from "drizzle-orm";
import { uploadOnCloudinary } from "../../../utils/cloudinary.js";

const listOfProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, pageSize = 6, q } = req.query;
    // console.log(q);

    const categories = req.query.categories
      ? JSON.parse(req?.query?.categories as string)
      : [];
    const colors = req.query.colors
      ? JSON.parse(req.query.colors as string)
      : [];
    const sizes = req.query.sizes ? JSON.parse(req.query.sizes as string) : [];
    const genderAndAgeCategories = req.query.genderAndAgeCategories
      ? JSON.parse(req.query.genderAndAgeCategories as string)
      : [];
    const brands = req.query.brands
      ? JSON.parse(req.query.brands as string)
      : [];
    const priceRange = req.query.priceRange
      ? JSON.parse(req.query.priceRange as string)
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
      colors.forEach((color: any) => {
        conditions.push(
          sql`EXISTS (
            SELECT 1 FROM jsonb_array_elements_text(${productsTable.color}::jsonb) AS elem
            WHERE LOWER(elem) = LOWER(${color})
          )`
        );
      });
    }

    if (sizes.length) {
      sizes.forEach((size: any) => {
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
          genderAndAgeCategories.map(
            (cat: string) => sql`${cat.toLowerCase()}`
          ),
          sql`, `
        )}]::text[])`
      );
    }

    if (categories.length) {
      conditions.push(
        sql`LOWER(${productsTable.subcategory}) = ANY(
          ARRAY[${sql.join(
            categories.map((cat: string) => sql`${cat.toLowerCase()}`),
            sql`, `
          )}]::text[]
        )`
      );
    }

    // if (brands.length) {
    //   conditions.push(
    //     sql`LOWER(${productsTable.brand}) = ANY(
    //       ARRAY[${sql.join(
    //         brands.map((brand: string) => sql`${brand.toLowerCase()}`),
    //         sql`, `
    //       )}]::text[]
    //     )`
    //   );
    // }

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

    // let productsList
    const productsList = await db.query.productsTable.findMany({
      where: conditions.length
        ? and(...conditions)
        : q
        ? or(
            q ? ilike(productsTable.name, `%${q}%`) : undefined,
            q ? ilike(productsTable.category, `%${q}%`) : undefined,
            q ? ilike(productsTable.subcategory, `%${q}%`) : undefined,
            q ? ilike(productsTable.description, `%${q}%`) : undefined,
            q ? ilike(productsTable.materials, `%${q}%`) : undefined
          )
        : undefined,
      orderBy: (products, { desc }) => desc(products.id),
      limit: Number(pageSize),
      offset: (Number(page) - 1) * Number(pageSize),
      // columns:{
      //   id:true,
      //   name:true
      // }
    });

    const totalProductsCount = await db
      .select({ count: count() })
      .from(productsTable)
      .where(
        conditions.length
          ? and(...conditions)
          : q
          ? or(
              ilike(productsTable.name, `%${q}%`),
              ilike(productsTable.category, `%${q}%`),
              ilike(productsTable.subcategory, `%${q}%`),
              ilike(productsTable.description, `%${q}%`),
              ilike(productsTable.materials, `%${q}%`)
            )
          : undefined
      );

    // console.log(productsList);

    res.status(200).json({
      totalProductsCount: totalProductsCount[0].count,
      productsList,
    });
  } catch (err: any) {
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
      (req.files as Express.Multer.File[])?.map((file) =>
        uploadOnCloudinary(file.path || "")
      ) || []
    );

    // Update product in the database
    const [product] = await db
      .update(productsTable)
      .set({ images: productImgs }) // Ensure 'images' field matches your DB schema
      .where(eq(productsTable.id, id))
      .returning();

    if (!product) {
      res.status(404).json({ message: "Product not found", status: 404 });
      return;
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
  updateProductImages,
};
