const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path');
const PORT = process.env.PORT || 5000;
const UriEntry = require('./models/UriEntry');
const DownloadCounter = require('./models/DownloadCounter');
const User = require('./models/User')
const optionalAuth = require('./optionalAuth');
const validator = require('validator');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.post('/api/uri', optionalAuth, async (req, res) => {
  console.log('Authenticated user:', req.user?.email || 'Anonymous');

  const { uri, pin } = req.body;
  if (!uri) return res.status(400).json({ message: 'URI required.' });

  if (!validator.isURL(uri, { require_protocol: true })) {
    return res.status(400).json({ message: 'Invalid URI format. Make sure it includes http:// or https://.' });
  }

  let generatedCode;
  let exists;
  do {
    generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    exists = await UriEntry.findOne({ code: generatedCode });
  } while (exists);

  try {
    const newEntry = await UriEntry.create({ code: generatedCode, uri, pin: pin || null });

    if (req.user) {
      req.user.URIs.push(newEntry._id);
      await req.user.save();
      req.user.markModified('URIs');
      console.log('Updated URIs:', req.user.URIs);
    }

    await incrementDownloadCount();

    res.status(201).json({ message: 'Entry saved.', code: generatedCode });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save URI.', error: err.message });
  }
});



app.get('/api/uri/:code', async (req, res) => {
  try {
    const entry = await UriEntry.findOne({ code: req.params.code });
    if (!entry) return res.status(404).json({ message: 'Code not found or expired.' });

    if (entry.pin) {
      return res.status(401).json({ message: 'PIN required' });
    }

    res.json({ uri: entry.uri });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

app.post('/api/uri/:code/unlock', async (req, res) => {
  const { pin } = req.body;

  try {
    const entry = await UriEntry.findOne({ code: req.params.code });
    if (!entry) return res.status(404).json({ message: 'Code not found or expired.' });

    if (!entry.pin) return res.status(400).json({ message: 'This code does not require a PIN.' });

    if (entry.pin === pin) {
      return res.json({ uri: entry.uri });
    } else {
      return res.status(403).json({ message: 'Incorrect PIN' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

async function incrementDownloadCount() {
  const counter = await DownloadCounter.findOne();
  if (!counter) {
    await DownloadCounter.create({ count: 1 });
  } else {
    counter.count += 1;
    await counter.save();
  }
}

app.get('/api/downloads/count', async (req, res) => {
  try {
    let counter = await DownloadCounter.findOne();
    if (!counter) {
      counter = await DownloadCounter.create({ count: 0 });
    }
    res.json({ count: counter.count });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch count', error: err.message });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({ user: { name: user.name, email: user.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



app.put('/api/user/update', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).populate('URIs');

    const { name, currentPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(403).json({ message: 'Current password is incorrect' });
    }

    if (name) user.name = name;
    if (newPassword && newPassword.length >= 8) {
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    res.json({ user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



app.get('/api/user/uris', optionalAuth, async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const user = await User.findById(req.user._id).populate('URIs');
    res.json({ uris: user.URIs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user URIs' });
  }
});


app.use(express.static(path.join(__dirname, '..', 'dist'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});