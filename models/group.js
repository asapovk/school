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
    type: String
  },

  teacher: {
    type: Schema.Types.ObjectId,
    ref: User
  },

  studentsIn: [ {type: Schema.Types.ObjectId, ref: User} ],
  studentsInv: [ {type: Schema.Types.ObjectId, ref: User} ],
  studentsAsk: [{type: Schema.Types.ObjectId, ref: User}]

}, {
  timestamps: true
});



module.exports = mongoose.model('Group', groupSchema);
