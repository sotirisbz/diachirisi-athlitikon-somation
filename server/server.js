import express, { urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("Mongodb connected successfully"))
//   .catch((err) => console.error("Mongodb connection error: ", err));
connectDb();

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    versions: {
      node: process.version,
      express: "5.1.0",
      mongoose: "8.19.1",
    },
  });
});

// Routes

// Expres automati error handling for routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Health: http://localhost:${PORT}/api/health`);
});
