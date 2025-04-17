// customer-service/src/app.js
require('dotenv').config();
const express = require('express');
const customerRoutes = require('./routes/customer.routes');
const { connectDB } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 8002;

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/customers', customerRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Customer Service is healthy' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Customer Service running on port ${PORT}`);
});