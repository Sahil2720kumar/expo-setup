import { Request, Response } from "express";

const listOfProducts=(req:Request,res:Response)=>{
   res.send("List of the products")
}

const getProductById=(req:Request,res:Response)=>{
   res.send(`A products: ,${req.params.id}`)
}

const insertProduct=(req:Request,res:Response)=>{
   console.log(req.body)
   res.send("Insert products")
}

const updateProduct=(req:Request,res:Response)=>{
   res.send("update products")
}

const deleteProduct=(req:Request,res:Response)=>{
   res.send("dalete products")
}

export {listOfProducts,getProductById,insertProduct,updateProduct,deleteProduct}