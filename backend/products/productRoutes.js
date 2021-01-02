import express from "express";
import { protect, merchant } from '../middleware/authMiddleware.js'


const router = express.Router();
import { getProducts, getProductById, deleteProduct } from "./productController.js";

router.route("/").get(getProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, merchant, deleteProduct)
  .put()
export default router;
