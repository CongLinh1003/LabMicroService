// customer-service/src/models/Customer.js
const { Pool } = require('pg');

class Customer {
  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
  }

  async getAllCustomers() {
    const query = 'SELECT * FROM customers';
    const result = await this.pool.query(query);
    return result.rows;
  }

  async getCustomerById(id) {
    const query = 'SELECT * FROM customers WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return result.rows[0];
  }

  async createCustomer(customerData) {
    const { name, email, phone, address } = customerData;
    const query = `
      INSERT INTO customers (name, email, phone, address)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await this.pool.query(query, [name, email, phone, address]);
    return result.rows[0];
  }

  async updateCustomer(id, customerData) {
    const { name, email, phone, address } = customerData;
    const query = `
      UPDATE customers
      SET name = $1, email = $2, phone = $3, address = $4, updated_at = NOW()
      WHERE id = $5
      RETURNING *
    `;
    const result = await this.pool.query(query, [name, email, phone, address, id]);
    return result.rows[0];
  }

  async deleteCustomer(id) {
    const query = 'DELETE FROM customers WHERE id = $1 RETURNING *';
    const result = await this.pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = new Customer();