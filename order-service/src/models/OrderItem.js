// order-service/src/models/OrderItem.js
const { Pool } = require('pg');

class OrderItemModel {
  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
  }

  async addOrderItem(orderId, productId, quantity, price) {
    const query = `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await this.pool.query(query, [orderId, productId, quantity, price]);
    return result.rows[0];
  }

  async getItemsByOrder(orderId) {
    const query = 'SELECT * FROM order_items WHERE order_id = $1';
    const result = await this.pool.query(query, [orderId]);
    return result.rows;
  }
}

module.exports = new OrderItemModel();