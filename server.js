import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env file

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

const app = express();
const PORT = process.env.PORT || 3000; // Use the port from environment variables or default to 3000

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/api/message', (req, res) => {
  console.log("Api Hit")
  res.json({ message: 'Hello from the server!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
