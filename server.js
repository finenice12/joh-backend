// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy database (just for testing)
let walletBalance = 5000;
let transactions = [];

// Root route
app.get('/', (req, res) => {
  res.send("JJ VTU Backend is running");
});

// Wallet balance
app.get('/api/wallet', (req, res) => {
  res.json({ balance: walletBalance });
});

// Airtime purchase
app.post('/api/airtime', (req, res) => {
  const { number, amount } = req.body;
  if (!number || !amount) {
    return res.status(400).json({ error: "Missing number or amount" });
  }
  if (amount > walletBalance) {
    return res.status(400).json({ error: "Insufficient balance" });
  }
  walletBalance -= amount;
  const txn = { type: "airtime", number, amount, date: new Date() };
  transactions.push(txn);
  res.json({ status: "success", message: "Airtime purchased", transaction: txn });
});

// Data purchase
app.post('/api/data', (req, res) => {
  const { number, plan } = req.body;
  if (!number || !plan) {
    return res.status(400).json({ error: "Missing number or plan" });
  }
  const cost = planCost(plan);
  if (cost > walletBalance) {
    return res.status(400).json({ error: "Insufficient balance" });
  }
  walletBalance -= cost;
  const txn = { type: "data", number, plan, amount: cost, date: new Date() };
  transactions.push(txn);
  res.json({ status: "success", message: "Data purchased", transaction: txn });
});

// Transactions history
app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

// Fund wallet
app.post('/api/fund', (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }
  walletBalance += amount;
  transactions.push({ type: "fund", amount, date: new Date() });
  res.json({ status: "success", balance: walletBalance });
});

// Helper: Plan costs
function planCost(plan) {
  const plans = {
    "1GB": 500,
    "2GB": 900,
    "5GB": 2000
  };
  return plans[plan] || 0;
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
