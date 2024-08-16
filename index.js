const express = require('express');
const { Pool } = require('pg');
const app = express();

// Load environment variables from the Docker environment
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware to parse JSON
app.use(express.json());

// Simple test route
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({
      status: 'success',
      message: 'API is working!',
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
});

app.get('/grocerylist', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM grocerylist');
      res.json(result.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

app.get('/grocerylist/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const result = await pool.query('SELECT * FROM grocerylist WHERE itemid = $1', [id]);
      if (result.rows.length === 0) {
          return res.status(404).json({ msg: 'Item not found' });
      }
      res.json(result.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

app.post('/grocerylist', async (req, res) => {
  const { itemname, quantity, unit, category, purchased, purchasedate, notes } = req.body;
  try {
      const result = await pool.query(
          `INSERT INTO grocerylist (itemname, quantity, unit, category, purchased, purchasedate, notes) 
           VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
          [itemname, quantity, unit, category, purchased || false, purchasedate, notes]
      );
      res.json(result.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

app.put('/grocerylist/:id', async (req, res) => {
  const { id } = req.params;
  const { itemname, quantity, unit, category, purchased, purchasedate, notes } = req.body;
  try {
      const result = await pool.query(
          `UPDATE grocerylist 
           SET itemname = $1, quantity = $2, unit = $3, category = $4, purchased = $5, purchasedate = $6, notes = $7 
           WHERE itemid = $8 RETURNING *`,
          [itemname, quantity, unit, category, purchased, purchasedate, notes, id]
      );
      if (result.rows.length === 0) {
          return res.status(404).json({ msg: 'Item not found' });
      }
      res.json(result.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

app.delete('/grocerylist/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const result = await pool.query('DELETE FROM grocerylist WHERE itemid = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
          return res.status(404).json({ msg: 'Item not found' });
      }
      res.json({ msg: 'Item deleted', item: result.rows[0] });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

app.patch('/grocerylist/:id/purchase', async (req, res) => {
  const { id } = req.params;
  try {
      const result = await pool.query(
          `UPDATE grocerylist 
           SET purchased = true, purchasedate = CURRENT_DATE 
           WHERE itemid = $1 RETURNING *`,
          [id]
      );
      if (result.rows.length === 0) {
          return res.status(404).json({ msg: 'Item not found' });
      }
      res.json(result.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
