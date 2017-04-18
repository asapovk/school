var Group = require('../../models/group');

exports.post = async (ctx) => {

  var groupTeacher = ctx.request.body.groupTeacher;
  var groupTitle = ctx.request.body.groupTitle;
  var groupTime = ctx.request.body.groupTime;

  var newGroup = new Group({groupName: groupTitle,
                  time: groupTime,
                  teacher: groupTeacher });
  console.log(newGroup);
  await newGroup.save();
  ctx.body  = 'Successfuly created new group';
}
