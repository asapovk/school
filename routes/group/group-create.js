var Group = require('../../models/group');

exports.post = async (ctx) => {

  var actionUser = ctx.request.body.actionUser;
  var groupTitle = ctx.request.body.groupTitle;
  var groupTime = ctx.request.body.groupTime;

  var newGroup = new Group({groupName: groupTitle,
                  time: groupTime,
                  teacher: actionUser });
  console.log(newGroup);
  await newGroup.save();
  console.log('Successfuly created new group');
  ctx.redirect('/');
}
