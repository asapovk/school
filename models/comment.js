const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

const commentSchema = new mongoose.Schema({

author: {type: Schema.Types.ObjectId, ref: User, required: true},
likes: [{type: Schema.Types.ObjectId, ref: User}],
time: {type: Number, required: true},
content: {type: String, required: true},
replies: [{type: Schema.Types.ObjectId}],
}, {
  timestamps: true
});



module.exports = mongoose.model('Comment', commentSchema);
