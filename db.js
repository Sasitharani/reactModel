import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Use environment variable for host
  user: process.env.DB_USER, // Use environment variable for user
  password: process.env.DB_PASSWORD, // Use environment variable for password
  database: process.env.DB_NAME, // Use environment variable for database name
  port: 3306 // Specify the port number
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id', connection.threadId);
});

export { connection as db };