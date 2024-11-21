import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { db } from './db.js'; // Import the database connection
import cors from 'cors';

app.use(cors()); // Enable CORS for all routes
const app = express();

app.use(bodyParser.json());

// Log when the server starts
console.log('Server is starting...');

// Create a new user
app.post('/api/users', (req, res) => {
  console.log('POST /api/users endpoint hit');
  const { name, email, age } = req.body;
  const query = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
  db.query(query, [name, email, age], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }
    res.status(201).send({ id: results.insertId, name, email, age });
  });
});

// Read all users
app.get('/api/users', (req, res) => {
  console.log('GET /api/users endpoint hit');
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.status(200).send(results);
  });
});

// Update a user
app.put('/api/users/:id', (req, res) => {
  console.log(`PUT /api/users/${req.params.id} endpoint hit`);
  const { id } = req.params;
  const { name, email, age } = req.body;
  const query = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
  db.query(query, [name, email, age, id], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send('Error updating data');
      return;
    }
    res.status(200).send({ id, name, email, age });
  });
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
  console.log(`DELETE /api/users/${req.params.id} endpoint hit`);
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Error deleting data');
      return;
    }
    res.status(200).send({ id });
  });
});

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} checking for mysql :(`);
});
