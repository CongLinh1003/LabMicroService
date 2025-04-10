require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

// Import routes
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const customerRoutes = require('./routes/customer.routes');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API Gateway is healthy' });
});

// Proxy routes - Sử dụng các route đã tách
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Product Service URL: ${process.env.PRODUCT_SERVICE_URL}`);
  console.log(`Order Service URL: ${process.env.ORDER_SERVICE_URL}`);
  console.log(`Customer Service URL: ${process.env.CUSTOMER_SERVICE_URL}`);
});