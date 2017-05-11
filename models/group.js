const mongoose = require('mongoose');
var Schema = mongoose.Schema;
//const config = require('config');

var User = require('./user');

const groupSchema = new mongoose.Schema({
  groupName:   {
    type: String,
    required: true
  },

  time: {
    day: {
      type: String,
      required: true,
      enum: ['Sun', 'Mon','Tus','Wen','Thu','Fri','Sat']
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

  teacher: {
    type: Schema.Types.ObjectId,
    ref: User
  },

  status: {
    type: String,
    default: ' '
  },

  studentsIn: [ {type: Schema.Types.ObjectId, ref: User} ],
  studentsInv: [ {type: Schema.Types.ObjectId, ref: User} ],
  studentsAsk: [{type: Schema.Types.ObjectId, ref: User}]

}, {
  timestamps: true
});


groupSchema.methods.statusForUser = function (userId) {
  if(this.studentsAsk.indexOf(userId) > -1) {
    return 'Отправлена заявка на вступление в группу';
  }
  if (this.studentsInv.indexOf(userId) > -1) {
    return 'Вас приглашают вступить в эту группу';
  }
  if (this.studentsIn.indexOf(userId) > -1) {
    return 'Вы участник этой группы';
  }
  else {
    return null;
  }
};




module.exports = mongoose.model('Group', groupSchema);
