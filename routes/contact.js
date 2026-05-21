const express = require('express');
const router = express.Router();
const connectDB = require('../config/db');
const Message = require('../models/Message');

router.post('/', async (req, res) => {
  try {
    // ✅ ensure DB connected before insert
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
    console.log("❌ ERROR:", error);

    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;