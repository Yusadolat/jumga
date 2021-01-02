import express from "express";
const router = express.Router();
import { getProducts, getProductById, deleteProduct } from "./productController.js";

router.route("/").get(getProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(deleteProduct)
  .put()
export default router;
