import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
dotenv.config();

mongoose
  .connect(process.env.URI)
  .then(() => console.log("DB is connected 🚀"))
  .catch((err) => console.error("DB connection error:", err));

const app = express();
app.use(cors());
app.use(cookieParser());

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded


// Import routes
import userRouter from "./routes/user.routes.js";

app.use("/api/user", userRouter);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err);
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log("Server is running at port " + process.env.PORT);
});
