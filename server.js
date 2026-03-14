// server.js
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (if needed)
app.use(express.json());

// Root route - this shows your backend is live
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Example API route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from joh-backend!" });
});

// Add your existing routes here
// app.post("/login", ...)
// app.get("/users", ...)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
