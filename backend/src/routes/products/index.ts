import { Router } from "express"
import { deleteProduct, getProductById, insertProduct, listOfProducts, updateProduct } from "./productsController"

const router=Router()

router.get("/",listOfProducts)
router.get("/:id",getProductById)
router.post("/",insertProduct)
router.put("/:id",updateProduct)
router.delete("/:id",deleteProduct)

export default router;