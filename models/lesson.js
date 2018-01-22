const mongoose = require('mongoose');
var Schema = mongoose.Schema;
//const config = require('config');

var User = require('./user');
var Group = require('./group');
var Comment = require('./comment');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  contentText: {
    type: String,
    required: true
  },
  contentVideo: {
    type: String
  },
  hometask: {
    type: String
  },
  comments: [{type: Schema.Types.ObjectId, ref: Comment}],
/*
  time: {
    month: {
      type: String,
      reuired: true,
      min: 1,
      max: 12,
      validate : {
          validator : Number.isInteger,
          message   : 'Month must be integer value!'
      }
    },
    day: {
      type: String,
      required: true,
      min: 1,
      max: 31,
      validate : {
          validator : Number.isInteger,
          message   : 'Day must be integer value!'
      }
    },
    hour: {
      type: Number,
      required: true,
      min: 0,
      max: 23,
      validate : {
          validator : Number.isInteger,
          message   : 'Hour must be integer value!'
      }
    },
    minute: {
      type: Number,
      required: true,
      min: 0,
      max: 59,
      validate : {
          validator : Number.isInteger,
          message   : 'Minute must be integer value!'
      }
    }
  },
*/
  group: {type: Schema.Types.ObjectId, ref: Group, required: true}

}, {
  timestamps: true
});






module.exports = mongoose.model('Lesson', lessonSchema);
