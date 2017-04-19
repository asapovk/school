var Group = require('../../models/group');

exports.post = async (ctx) => {

  var groupToDelete = ctx.request.body.groupToDelete;

  var deletedGroup = await Group.findByIdAndRemove(groupToDelete);
  console.log(groupToDelete);

  ctx.body  = 'Successfuly deleted group';
}
