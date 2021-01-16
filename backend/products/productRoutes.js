import express from "express";
import { protect } from '../middleware/authMiddleware.js'


const router = express.Router();
import {createProduct,  getProductById } from "./productController.js";

router.route("/").get().post(createProduct)
router
  .route('/:id')
  .get(protect, getProductById)
export default router;
