import { Router } from "express"
import { deleteProduct, getProductById, insertProduct, listOfProducts, updateProduct } from "./productsController"
import { validateData } from "../../middlewares/validationMiddleware"
import { insertProductSchema, products, updateProductSchema } from "../../db/productsSchema";
import {verifyToken} from "../../middlewares/authMiddleware"
import { verifyAuthorizaion } from "../../middlewares/authorizationMiddleware";

// Using Zod schema

// export const insertProductSchema = z.object({
//     // id: z.number().int(), // Auto-generated primary key
//     category: z.string().max(255), // String with max length of 255
//     subcategory: z.string().max(255), // String with max length of 255
//     name: z.string().max(255), // String with max length of 255
//     description: z.string(), // Text field
//     price: z.number().nonnegative().refine(val => val.toFixed(2) === val.toFixed(2)), // Numeric with precision 10, scale 2
//     size: z.array(z.string()), // Array of sizes, e.g., ["S", "M", "L", "XL"]
//     color: z.array(z.string()), // Array of colors, e.g., ["White", "Black", "Blue"]
//     inStock: z.boolean(), // Boolean value
//     images: z.array(z.string()), // Array of image file names
//     rating: z.number().min(0).max(5), // Floating-point rating between 0 and 5
//   });

//const insertProductSchema=createInsertSchema(products)



//type ProductType = z.TypeOf<typeof insertProductSchema>;

 
const router=Router()

router.get("/",listOfProducts)
router.get("/:id",getProductById)
router.post("/",verifyToken,verifyAuthorizaion,validateData(insertProductSchema),insertProduct)
router.put("/:id",verifyToken,verifyAuthorizaion,validateData(updateProductSchema),updateProduct)
router.delete("/:id",verifyToken,verifyAuthorizaion,deleteProduct) 

export default router;