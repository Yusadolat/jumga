import asyncHandler from "express-async-handler";
import Product from "../products/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).send({ status: "Failed", message: error });
  }
});

const createProduct = asyncHandler(async (req, res) => {
  try{
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
} catch (error) {
  res.status(500).send({ error})
}
})


const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send({ status: "Failed", message: error.message });
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
