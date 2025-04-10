// order-service/src/routes/order.routes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrder);
router.get('/customer/:customerId', orderController.getCustomerOrders);
router.patch('/:id/cancel', orderController.cancelOrder);

module.exports = router;