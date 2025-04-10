// product-service/src/models/Product.js
const { Pool } = require('pg');

class Product {
  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
  }

  async getAllProducts() {
    const query = 'SELECT * FROM products';
    const result = await this.pool.query(query);
    return result.rows;
  }

  async getProductById(id) {
    const query = 'SELECT * FROM products WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return result.rows[0];
  }

  async createProduct(productData) {
    const { name, price, description, stock_quantity } = productData;
    const query = `
      INSERT INTO products (name, price, description, stock_quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await this.pool.query(query, [name, price, description, stock_quantity]);
    return result.rows[0];
  }

  async updateProduct(id, productData) {
    const { name, price, description, stock_quantity } = productData;
    const query = `
      UPDATE products
      SET name = $1, price = $2, description = $3, stock_quantity = $4, updated_at = NOW()
      WHERE id = $5
      RETURNING *
    `;
    const result = await this.pool.query(query, [name, price, description, stock_quantity, id]);
    return result.rows[0];
  }

  async deleteProduct(id) {
    const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
    const result = await this.pool.query(query, [id]);
    return result.rows[0];
  }

  async checkStock(productId, quantity) {
    const query = 'SELECT stock_quantity FROM products WHERE id = $1';
    const result = await this.pool.query(query, [productId]);
    
    if (result.rows.length === 0) {
      throw new Error('Product not found');
    }
    
    return result.rows[0].stock_quantity >= quantity;
  }
}

module.exports = new Product();