router.post('/', async (req, res) => {
  try {
    await require('../config/db')(); // ENSURE connection first

    const { name, email, message } = req.body;

    const newMessage = new Message({ name, email, message });

    await newMessage.save();

    res.json({
      success: true,
      message: 'Message sent successfully',
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});