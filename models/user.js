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

  groupsIn: [ {type: Schema.Types.ObjectId, ref: Group} ],
  groupsInv: [{type: Schema.Types.ObjectId, ref: Group} ],
  groupsAsk: [{type: Schema.Types.ObjectId, ref: Group} ]

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


userSchema.methods.statusInGroup = function (groupId) {
  if(this.groupsAsk.indexOf(groupId) > -1) {
    return 'Хочет вступить в группу';
  }
  if (this.groupsInv.indexOf(groupId) > -1) {
    return 'Приглашен в группу';
  }
  if (this.groupsIn.indexOf(groupId) > -1) {
    return 'Участник группы';
  }
  else {
    return null;
  }
};






module.exports = mongoose.model('User', userSchema);
