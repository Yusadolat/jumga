import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import bankRoutes from "./banks/bankRoutes.js"
import userRoutes from "./users/userRoutes.js"
import productRoutes from "./products/productRoutes.js"
import orderRoutes from "./orders/orderRoutes.js"

dotenv.config();

connectDB();

const app = express();




app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Wowza, API is running....");
});
app.use('/api/v1/banks', bankRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/products', productRoutes)
app.use('/api/orders', orderRoutes)



const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
