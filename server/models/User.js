const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  URIs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UriEntry' }]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
