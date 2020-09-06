const express = require('express');
require('dotenv').config();

const connectDb = require('./config/db');

const app = express();

// Body Parser
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Default route
app.get('/', (req, res, next) => {
  res.send('Server running!');
});

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/tickets', require('./routes/api/tickets'));
app.use('/api/projects', require('./routes/api/projects'));

// Connect to database
connectDb();

// Initialize server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
