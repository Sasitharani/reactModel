// Import the mongoose module
const mongoose = require('mongoose');

// Define the MongoDB connection string
const mongoDB = 'your_mongodb_connection_string_here';

// Connect to the MongoDB database using the connection string
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a schema for the collection
const Schema = mongoose.Schema;

// Create a new schema for a simple user model
const UserSchema = new Schema({
  name: { type: String, required: true }, // User's name, required field
  email: { type: String, required: true }, // User's email, required field
  age: { type: Number, required: true } // User's age, required field
});

// Create a model using the schema
const User = mongoose.model('User', UserSchema);

// Export the model to use it in other parts of the application
module.exports = User;