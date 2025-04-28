
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');


const app = express();

app.use(cors({
  origin: 'https://23dp1dsarp.github.io'
}));
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,  
    pass: process.env.GMAIL_PASS   
  }
});

app.get('/', (req, res) => {
  res.send('Feedback API is running.');
});


app.post('/submit-feedback', async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ success: false, error: 'Email and message are required.' });
  }

  const mailOptions = {
    from: email,
    to: process.env.GMAIL_USER,
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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
