// order-service/src/services/order.service.js
const axios = require('axios');
const orderModel = require('../models/Order');
const orderItemModel = require('../models/OrderItem');

class OrderService {
  async createOrder(customerId, items) {
    // Validate customer
    try {
      await axios.get(`${process.env.CUSTOMER_SERVICE_URL}/api/customers/${customerId}`);
    } catch (error) {
      throw new Error('Customer not found');
    }

    // Calculate total and validate products
    let totalAmount = 0;
    for (const item of items) {
      try {
        const response = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/api/products/${item.productId}/check-stock?quantity=${item.quantity}`);
        if (!response.data.inStock) {
          throw new Error(`Product ${item.productId} is out of stock`);
        }
        
        const product = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/api/products/${item.productId}`);
        totalAmount += product.data.price * item.quantity;
      } catch (error) {
        throw new Error(`Product validation failed: ${error.message}`);
      }
    }

    // Create order
    const order = await orderModel.createOrder(customerId, totalAmount);

    // Add order items
    for (const item of items) {
      const product = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/api/products/${item.productId}`);
      await orderItemModel.addOrderItem(order.id, item.productId, item.quantity, product.data.price);
    }

    return this.getOrderDetails(order.id);
  }

  async getOrderDetails(id) {
    const order = await orderModel.getOrderById(id);
    if (!order) {
      throw new Error('Order not found');
    }

    const items = await orderItemModel.getItemsByOrder(id);
    return { ...order, items };
  }

  async getCustomerOrders(customerId) {
    const orders = await orderModel.getOrdersByCustomer(customerId);
    return Promise.all(orders.map(async order => {
      const items = await orderItemModel.getItemsByOrder(order.id);
      return { ...order, items };
    }));
  }

  async cancelOrder(id) {
    const order = await orderModel.getOrderById(id);
    if (!order) {
      throw new Error('Order not found');
    }
    if (order.status === 'CANCELLED') {
      throw new Error('Order already cancelled');
    }
    return orderModel.cancelOrder(id);
  }
}

module.exports = new OrderService();