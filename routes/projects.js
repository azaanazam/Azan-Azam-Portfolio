const express = require('express');
const router = express.Router();
const Project = require('../models/Project');


router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
});

router.post('/', async (req, res) => {
  const { title, description, stack, link } = req.body;

  try {
    const newProject = new Project({ title, description, stack, link });
    await newProject.save();
    res.status(201).json({ 
      success: true, 
      data: newProject 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
});

module.exports = router;