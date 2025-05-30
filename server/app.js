const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const UriEntry = require('./models/UriEntry');
const DownloadCounter = require('./models/DownloadCounter');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.post('/api/uri', async (req, res) => {
    const { code, uri, pin } = req.body;
    if (!code || !uri) return res.status(400).json({ message: 'Code and URI required.' });

    try {
        await UriEntry.create({ code, uri, pin: pin || null });

          await incrementDownloadCount();
        res.status(201).json({ message: 'Entry saved.' });
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



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
