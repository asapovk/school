const mongoose = require('mongoose');
var Schema = mongoose.Schema;
//const config = require('config');

var User = require('./user');
var Group = require('./group');
var Comment = require('./comment');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  links: [{ source: {type: String},
            desc: {type: String}
          }],
  comments: [{type: Schema.Types.ObjectId, ref: Comment}],

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
  group: {type: Schema.Types.ObjectId, ref: Group, required: true},
  participants : [
    {   student: {type: Schema.Types.ObjectId, ref: User},
        stars: {  type: Number,
                  min: 0,
                  max: 5,
                  validate: {
                    validator : Number.isInteger,
                    message   : 'Stars must be integer value!'
                  }
                }
    }
  ]

}, {
  timestamps: true
});






module.exports = mongoose.model('Lesson', lessonSchema);
