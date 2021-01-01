import express from "express";
const router = express.Router();
import { getProducts, getProductById } from "./productController.js";

router.route("/").get(getProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete()
  .put()
export default router;
