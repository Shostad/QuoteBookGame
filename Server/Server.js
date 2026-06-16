const express = require('express');
const db = require('./DB'); // Adjust path based on your folder structure
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Example API endpoint fetching users from PostgreSQL
app.get('/api/users', async (req, res) => {
    console.log("running query")
  try {
    const result = await db.query('SELECT * FROM users ORDER BY id ASC');
    res.status(209).json(result.rows);
    console.log(res)
  } catch (error) {
    console.error('Database connection error:', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running smoothly on port ${PORT}`);
});