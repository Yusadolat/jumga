import asyncHandler from "express-async-handler";
import Product from "../products/productModel.js";


const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find()

  res.status(200).json(products);

  } catch (error) {
      res.status(500).send({message: error});
  }
      
  }) 

  const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
  
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
  

export { getProducts, getProductById };
