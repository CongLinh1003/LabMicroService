// order-service/src/models/Order.js
const { Pool } = require('pg');

class OrderModel {
  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
  }

  async createOrder(customerId, totalAmount) {
    const query = `
      INSERT INTO orders (customer_id, total_amount, status)
      VALUES ($1, $2, 'PENDING')
      RETURNING *
    `;
    const result = await this.pool.query(query, [customerId, totalAmount]);
    return result.rows[0];
  }

  async getOrderById(id) {
    const query = 'SELECT * FROM orders WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return result.rows[0];
  }

  async getOrdersByCustomer(customerId) {
    const query = 'SELECT * FROM orders WHERE customer_id = $1';
    const result = await this.pool.query(query, [customerId]);
    return result.rows;
  }

  async updateOrderStatus(id, status) {
    const query = `
      UPDATE orders 
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;
    const result = await this.pool.query(query, [status, id]);
    return result.rows[0];
  }

  async cancelOrder(id) {
    return this.updateOrderStatus(id, 'CANCELLED');
  }
}

module.exports = new OrderModel();