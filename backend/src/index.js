require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// ensure uploads directory
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
app.use('/uploads', express.static(uploadsDir));

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`),
});
const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function adminOnly(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Requires admin role' });
}

// Auth routes
app.post('/api/auth/register', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Missing fields' });
  const hashed = bcrypt.hashSync(password, 8);
  const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
  stmt.run(username, hashed, role || 'user', function (err) {
    if (err) return res.status(400).json({ message: 'User exists or invalid' });
    const user = { id: this.lastID, username, role: role || 'user' };
    const token = generateToken(user);
    res.json({ user, token });
  });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Missing fields' });
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = bcrypt.compareSync(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ user: { id: user.id, username: user.username, role: user.role }, token });
  });
});

// Products routes
app.get('/api/products', authMiddleware, (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.json(rows);
  });
});

app.get('/api/products/:id', authMiddleware, (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err || !row) return res.status(404).json({ message: 'Not found' });
    res.json(row);
  });
});

// accept multipart/form-data (image) or JSON
app.post('/api/products', authMiddleware, adminOnly, upload.single('image'), (req, res) => {
  const { name, quantity = 0, price = 0, category } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image || '';
  const stmt = db.prepare('INSERT INTO products (name, quantity, price, category, image) VALUES (?, ?, ?, ?, ?)');
  stmt.run(name, quantity, price, category, imagePath, function (err) {
    if (err) return res.status(400).json({ message: 'Invalid data' });
    res.json({ id: this.lastID, name, quantity, price, category, image: imagePath });
  });
});

app.put('/api/products/:id', authMiddleware, adminOnly, upload.single('image'), (req, res) => {
  const { name, quantity, price, category } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image || '';
  db.run(
    'UPDATE products SET name = ?, quantity = ?, price = ?, category = ?, image = ? WHERE id = ?',
    [name, quantity, price, category, imagePath, req.params.id],
    function (err) {
      if (err) return res.status(400).json({ message: 'Update failed' });
      res.json({ id: Number(req.params.id), name, quantity, price, category, image: imagePath });
    }
  );
});

app.delete('/api/products/:id', authMiddleware, adminOnly, (req, res) => {
  db.get('SELECT image FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (row && row.image) {
      const filePath = path.join(__dirname, '..', row.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    db.run('DELETE FROM products WHERE id = ?', [req.params.id], function (err) {
      if (err) return res.status(400).json({ message: 'Delete failed' });
      res.json({ deleted: true });
    });
  });
});

// Movements (simple record)
app.get('/api/movements', authMiddleware, (req, res) => {
  db.all('SELECT * FROM movements ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.json(rows);
  });
});

app.post('/api/movements', authMiddleware, (req, res) => {
  const { productId, type, amount } = req.body;
  const stmt = db.prepare('INSERT INTO movements (productId, type, amount) VALUES (?, ?, ?)');
  stmt.run(productId, type, amount, function (err) {
    if (err) return res.status(400).json({ message: 'Invalid movement' });
    res.json({ id: this.lastID, productId, type, amount });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
