import express from "express";
import { protect } from '../middleware/authMiddleware.js'


const router = express.Router();
import {
  createProduct,
  getProductById,
  getAllProducts,
} from "./productController.js";

router.route("/").get(getAllProducts).post(createProduct);
router
  .route('/:id')
  .get(getProductById)
export default router;
