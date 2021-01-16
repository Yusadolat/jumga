import express from "express";
import { protect, merchant } from '../middleware/authMiddleware.js'


const router = express.Router();
import {createProduct, getProducts, getProductById, deleteProduct } from "./productController.js";

router.route("/").get(getProducts).post(createProduct)
router
  .route('/:id')
  .get(getProducts)
  .delete(protect, merchant, deleteProduct)
  .put()
export default router;
