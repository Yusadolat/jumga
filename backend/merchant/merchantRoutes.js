import express from "express";
import { protect, merchant } from '../middleware/authMiddleware.js'


const router = express.Router();
import { getProducts, deleteProduct } from "./merchantController.js";

router
  .route("/:id")
  .get(getProducts)
  .delete(protect, merchant, deleteProduct)
  .put();

export default router;
