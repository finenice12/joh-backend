// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Example route: airtime
app.get('/airtime', (req, res) => {
  res.json({ message: 'Airtime API working!' });
});

// Example route: data
app.get('/data', (req, res) => {
  res.json({ message: 'Data API working!' });
});

// Add more routes here for your app...

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
