const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = express.Router();

router.use('/', createProxyMiddleware({
  target: process.env.ORDER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/orders': '' },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying order request: ${req.method} ${req.path}`);
  },
  onError: (err, req, res) => {
    console.error('[Order Service Error]:', err);
    res.status(502).json({
      error: 'Order Service is currently unavailable',
      timestamp: new Date().toISOString()
    });
  }
}));

// Custom route for order cancellation
router.patch('/:id/cancel', createProxyMiddleware({
  target: process.env.ORDER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/orders': '' }
}));

module.exports = router;