// server.js
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// API test route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from joh-backend!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
