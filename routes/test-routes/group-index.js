var User = require('../../models/user');
var Group = require('../../models/group');
exports.get = async (ctx) => {

    var userSession = ctx.session.user || null;
    var userId = userSession._id;
    var user = await User.findById(userId).catch(function(){
      console.log('Error happened when tried to find user in database!');
      ctx.body = 'Error! Try to reload the page';
    });
    if(user) {
      ctx.state.user = user;
      var allGroups =  await Group.find();
      allGroups.forEach(function(group){
      //  if(group.statusForUser(userId)) {
          group.status = group.statusForUser(userId);
      //  }
      });
        //console.log('statused user is '+allUsers[1]);
      await ctx.render('group-index', {allGroups: allGroups});
      return;
    }
    else {
      console.log('user whith such id does not exist');
      ctx.redirect('/');
      return;
    }
}
