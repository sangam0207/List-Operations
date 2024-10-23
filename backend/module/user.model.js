const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  city: {
    type: String,
    required: true,
    trim: true
  }
});

const User = mongoose.model('User', listSchema);

module.exports = User;
