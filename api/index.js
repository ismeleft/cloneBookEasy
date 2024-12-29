import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import hotelsApiRoute from "./ApiRoutes/hotels.js";
import roomsApiRoute from "./ApiRoutes/rooms.js";
import usersApiRoute from "./ApiRoutes/users.js";
import authApiRoute from "./ApiRoutes/auth.js";

const app = express();
dotenv.config();

// Function to connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB");
  }
};

// MongoDB connection status handlers
mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established!");
});
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB connection closed!");
});

const port = 5000;
app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});

// Middleware setup
app.use(cookieParser()); // Parse cookies in incoming requests
app.use(express.json()); // Parse JSON bodies

// Middlewares for handling specific routes
app.use("/api/v1/hotels", hotelsApiRoute);
app.use("/api/v1/rooms", roomsApiRoute);
app.use("/api/v1/users", usersApiRoute);
app.use("/api/v1/auth", authApiRoute);

// Error handling middleware for handling route errors
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage =
    error.message || "An error occurred during route processing";
  return res.status(errorStatus).json({
    // Returns the error response so that it can be caught by next(error)
    status: errorStatus,
    message: errorMessage,
  });
});
