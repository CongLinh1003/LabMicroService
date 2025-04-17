// customer-service/src/config/database.js
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const connectDB = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('Customer Service DB connected successfully');
  } catch (error) {
    console.error('Customer Service DB connection error:', error);
    process.exit(1);
  }
};

module.exports = { connectDB, pool };