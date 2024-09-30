require('dotenv').config({ silent: true });
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static('public/images'));

mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect: ${err}`));

const { Message } = require('./models/Message');
const { User } = require('./models/User');

app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({});
    res.json({ messages, status: 'all good' });
  } catch (err) {
    res.status(400).json({ error: err, status: 'failed' });
  }
});

app.get('/messages/:messageId', async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    res.json({ message, status: 'cool' });
  } catch (err) {
    res.status(400).json({ error: err, status: 'failed' });
  }
});

app.post('/messages/save', async (req, res) => {
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    });
    res.json({ message, status: 'cool' });
  } catch (err) {
    res.status(400).json({ error: err, status: 'failed' });
  }
});

// About Us PAGE
app.get('/about-us', (req, res) => {
  const aboutUsData = {
    text: "Hi! My name is Raiyan! I switched into computer science my junior year, so I've been playing catchup, but I love it so much more than organic chemistry. In my free time, I compete on the NYU Taekwondo Team + embark on my lifelong quest of finding the best hidden gem delis in the city. This image below I actually created using an ascii converter website. Its pretty cool in my opinion, but it took me a while to figure out the spacing because it copy pasted into my editor weird.",
    imageUrl: "http://localhost:7002/images/raiyan-photo.jpg"
  };

  res.json(aboutUsData);
});

module.exports = app;
