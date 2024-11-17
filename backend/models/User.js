const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  country: String, // User's selected country
  role: { type: String, enum: ['Admin', 'Viewer'], default: 'Viewer' },
});

module.exports = mongoose.model('User', userSchema);
