// order-service/src/controllers/order.controller.js
const orderService = require('../services/order.service');

class OrderController {
  async createOrder(req, res) {
    try {
      const { customerId, items } = req.body;
      const order = await orderService.createOrder(customerId, items);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getOrder(req, res) {
    try {
      const order = await orderService.getOrderDetails(req.params.id);
      res.json(order);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getCustomerOrders(req, res) {
    try {
      const orders = await orderService.getCustomerOrders(req.params.customerId);
      res.json(orders);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async cancelOrder(req, res) {
    try {
      const order = await orderService.cancelOrder(req.params.id);
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new OrderController();