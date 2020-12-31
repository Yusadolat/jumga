import express from "express";
const router = express.Router();
import { getProducts } from "../products/productController.js";

router.route("/").get(getProducts);

export default router;
