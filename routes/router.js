const { createProduct, getProducts, updateProduct, removeProduct } = require("../controller/ProductsController")

let router=require("express").Router()
router.post("/add",createProduct)
router.get("/products",getProducts)
router.put("/update/:id",updateProduct)
router.delete("/delete/:id",removeProduct)

module.exports=router