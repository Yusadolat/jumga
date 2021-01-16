import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from 'cors'
import bankRoutes from "./banks/bankRoutes.js"
import userRoutes from "./users/userRoutes.js"
import productRoutes from "./products/productRoutes.js"
import merchantRoutes from "./merchant/merchantRoutes.js"
import orderRoutes from "./orders/orderRoutes.js"

dotenv.config();

connectDB();

const app = express();




app.use(express.json());
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});
app.get("/", (req, res) => {
  res.send("Wowza, API is running....");
});
app.use('/api/v1/banks', bankRoutes)
app.use('/api/v1/users', cors(), userRoutes)
app.use('/api/v1/merchant/products', merchantRoutes)
app.use("/api/v1/products", productRoutes);
app.use('/api/orders', orderRoutes)



const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
