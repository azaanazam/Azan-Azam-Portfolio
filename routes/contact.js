const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();
const Message = require('../models/Message');


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


router.post('/', async (req, res) => {

  console.log("BODY AA RAHI HAI:", req.body);

  const { name, email, message } = req.body;

  
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'All Filed'
    });
  }

  try {

    const newMessage = new Message({
      name,
      email,
      message
    });

    await newMessage.save();

    console.log("MESSAGE SAVED");

    
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "🔥 New Portfolio Contact Message",
      text: `
New message received:

Name: ${name}
Email: ${email}
Message: ${message}
      `
    });

    console.log("EMAIL SENT");

    
    res.status(201).json({
      success: true,
      message: 'Message saved + Email sent successfully!'
    });

  } catch (err) {

    console.log("ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});



router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: messages
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

module.exports = router;