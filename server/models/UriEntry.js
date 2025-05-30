const mongoose = require('mongoose');

const uriEntrySchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    uri: { type: String, required: true },
    pin: { type: String, default: null },
    createdAt: { type: Date, default: Date.now, expires: 86400 },
});

module.exports = mongoose.model('UriEntry', uriEntrySchema);
