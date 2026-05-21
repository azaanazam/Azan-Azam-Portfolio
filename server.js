const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// DB connect (safe)
connectDB();

app.use('/api/contact', require('./routes/contact'));
app.use('/api/projects', require('./routes/projects'));

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running successfully',
  });
});

module.exports = app;