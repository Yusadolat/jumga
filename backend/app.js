import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./users/userRoutes.js"

dotenv.config();

connectDB();

const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Wowza, API is running....");
});
app.use('/api/v1/users', userRoutes)


const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
