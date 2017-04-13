const mongoose = require('mongoose');
const config = require('config');
var Group = require('./group');
var Schema = mongoose.Schema;


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
  },

  role: {
    type: String,
    default: 'student'
  },

  groups: [ {type: Schema.Types.ObjectId, ref: Group} ]

}, {
   timestamps: true,
   toObject: {
     virtuals: true
   },
   toJSON: {
   virtuals: true
  }
}
);


userSchema.virtual('isAdmin').get(function() {

   if(this.role === 'admin') {
      return true;
   }
   else {
     return false;
   }
});




module.exports = mongoose.model('User', userSchema);
