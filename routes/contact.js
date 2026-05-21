const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const connectDB = require('../config/db');

router.post('/', async (req, res) => {
  try {
    // 🔥 ensure DB is connected first
    await connectDB();

    const { name, email, message } = req.body;

    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();

    res.json({
      success: true,
      message: 'Message sent successfully',
    });

  } catch (error) {
    console.log("ERROR:", error);

    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;