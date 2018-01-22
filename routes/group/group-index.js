var User = require('../../models/user');
var Group = require('../../models/group');
exports.get = async (ctx) => {


    var user = ctx.state.user || null;
    var allGroups =  await Group.find();
    if(user) {
      var userId = user._id.toString();
      allGroups.forEach(function(group){
        group.status = group.statusForUser(userId);
      });
    }
    await ctx.render('group/teacher/group-index', {allGroups: allGroups});
    return;
}
