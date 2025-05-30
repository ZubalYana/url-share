const mongoose = require('mongoose');

const downloadCounterSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('DownloadCounter', downloadCounterSchema);
