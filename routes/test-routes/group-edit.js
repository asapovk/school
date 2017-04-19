var Group = require('../../models/group');

exports.post = async (ctx) => {

  var groupTeacher = ctx.request.body.groupTeacher;
  var groupTitle = ctx.request.body.groupTitle;
  var groupTime = ctx.request.body.groupTime;
  var groupId = ctx.request.body.groupId;

  var newGroup = await Group.findOneAndUpdate({_id: groupId}, {$set: {time: groupTime, groupName: groupTitle, teacher: groupTeacher}}, {new: true})

  if(newGroup) {
    ctx.body  = 'Successfuly edited group';
  }
  else {
    ctx.body  = 'Error on edit group';
  }

}
