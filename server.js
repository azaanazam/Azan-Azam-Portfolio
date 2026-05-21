const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();



app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());


app.use('/api/contact', require('./routes/contact'));
app.use('/api/projects', require('./routes/projects'));


app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running successfully',
  });
});



mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB Connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB Error:', err.message);
  });



if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
}



module.exports = app;