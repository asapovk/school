const mongoose = require('mongoose');
const crypto = require('crypto');
const _ = require('lodash');
const config = require('config');

const userSchema = new mongoose.Schema({
  firstName:   {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  vkId: {
    type: String,
    required: true
  },

  balance: {
    type: Number,
    required: true,
    default: 0.0
  },

  email:   {
    type: String
  },

  phone: {
    type: String
  }

}, {
  timestamps: true
});



module.exports = mongoose.model('User', userSchema);
