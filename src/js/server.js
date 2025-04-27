// Import packages
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

// Initialize app
const app = express();

// Middleware
app.use(cors()); // allow frontend from GitHub Pages
app.use(bodyParser.json());

// Create transporter for sending email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,  // Set this in Render settings
    pass: process.env.GMAIL_PASS   // Set this in Render settings
  }
});

app.get('/', (req, res) => {
  res.send('Feedback API is running.');
});

// API route to handle feedback
app.post('/submit-feedback', async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ success: false, error: 'Email and message are required.' });
  }

  const mailOptions = {
    from: email,
    to: process.env.GMAIL_USER,  // send feedbacks to yourself
    subject: 'New Feedback Submission',
    text: `You received feedback:\n\nFrom: ${email}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Feedback sent successfully!' });
  } catch (error) {
    console.error('Error sending feedback email:', error);
    res.status(500).json({ success: false, error: 'Failed to send feedback. Please try again.' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
