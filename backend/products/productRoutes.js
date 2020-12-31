import express from "express";
const router = express.Router();
import { getProducts } from "./productController.js";

router.route("/").get(getProducts);

export default router;
