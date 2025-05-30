const mongoose = require('mongoose');

const uriEntrySchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    uri: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 86400 }, // Optional: expires after 24h
});

module.exports = mongoose.model('UriEntry', uriEntrySchema);
