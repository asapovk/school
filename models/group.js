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
    type: String,
    required: true
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
