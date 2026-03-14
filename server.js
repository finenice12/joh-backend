// server.js
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("JOH Backend is running 🚀");
});

// Test API
app.get("/api", (req, res) => {
  res.json({ message: "Hello from joh-backend!" });
});

// Airtime endpoint
app.get("/buy-airtime", (req, res) => {
  res.json({ status: "Airtime endpoint ready" });
});

// Data endpoint
app.get("/buy-data", (req, res) => {
  res.json({ status: "Data endpoint ready" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
