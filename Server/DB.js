const { Pool } = require('pg');
require('dotenv').config();

// Configuration maps directly to variables in your .env file
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Export a query helper function to use across your app
module.exports = {
  query: (text, params) => pool.query(text, params),
};