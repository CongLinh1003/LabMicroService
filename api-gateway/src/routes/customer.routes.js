const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = express.Router();

router.use('/', createProxyMiddleware({
  target: process.env.CUSTOMER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/customers': '' },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying customer request: ${req.method} ${req.path}`);
  },
  onError: (err, req, res) => {
    console.error('[Customer Service Error]:', err);
    res.status(502).json({
      error: 'Customer Service is currently unavailable',
      timestamp: new Date().toISOString()
    });
  }
}));

// Special endpoint for customer search
router.get('/search', createProxyMiddleware({
  target: process.env.CUSTOMER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/customers/search': '/search' }
}));

module.exports = router;