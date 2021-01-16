import asyncHandler from "express-async-handler";
import Product from "../products/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  try {
    let  user_id = req.params.user_id
    const products = await Product.find({user_id: user_id});

    res.status(200).json({status: "success",
    message: "All Dues",
    data:{products},});
  } catch (error) {
    res.status(500).send({ status: "Failed", message: error });
  }
});

const createProduct = asyncHandler(async (req, res) => {
  try{
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    merchant_id: req.body.merchant_id,
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    delivery_fee: req.body.delivery_fee,
    currency: req.body.currency,
    
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
} catch (error) {
  res.status(500).send({message: error.message})
}
})


const getProductById = asyncHandler(async (req, res) => {
  try{
  const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).send({ status: "Failed", message: error });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { createProduct, getProducts, getProductById, deleteProduct };
