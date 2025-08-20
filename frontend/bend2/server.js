const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const result = await pool.query('SELECT * FROM usercredentials WHERE username = $1', [username]);
    const user = result.rows[0];
    if (user) {
      console.log('User found:', user);
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        return res.status(200).send('Login successful');
      }
      else {
        return res.status(401).send('Invalid password');
      }
    }
    else {
      return res.status(404).send('User not found');
    }
  }
  catch (error) {
    console.error('Error querying database:', error);
  return res.status(500).send('Server error');
  }
});

// API route to fetch product names where stock > minstock
app.get('/product-names', async (req, res) => {
  try {
    const result = await pool.query('SELECT pname FROM products WHERE stock > minstock');
    res.json(result.rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// API route to fetch product details by pname
app.get('/product-details', async (req, res) => {
  const pname = req.query.pname;
  console.log(`Fetching details for product: ${pname}`);
  if (!pname) {
    return res.status(400).json({ error: 'Product name is required' });
  }
  try {
    const result = await pool.query(
      `SELECT pname, TO_CHAR(expiry, 'DD-MM-YYYY') AS expiry, mrp::numeric AS mrp FROM products WHERE pname = $1`,
      [pname]
    );
    console.log(`Query result: ${result.rows}`);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// API route to fetch customer details by cid
app.use(express.json());
app.get('/customer-details', async (req, res) => {
  const cid = req.query.cid;
  console.log(`Fetching details for customer ID: ${cid}`);
  if (!cid) {
    return res.status(400).json({ error: 'Customer ID is required' });
  }
  try {
    const result = await pool.query(
      `SELECT cname FROM customers WHERE cid = $1`,
      [cid]
    );
    console.log(`Query result: ${result.rows}`);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/add-customer', async (req, res) => { 
  const { cname, cphone, email, caddress } = req.body;
  try { const result = await pool.query(
    `INSERT INTO customers (cname, cphone, email, caddress, progid, loyalty)
    VALUES ($1, $2, $3, $4, NULL, 0) RETURNING cid`,
    [cname, cphone, email, caddress || null]
  );
  
  res.status(201).json({ success: true, cid: result.rows[0].cid, cname: result.rows[0].cname });
} catch (error) {
   console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
