var User = require('../../models/user');
var Group = require('../../models/group');
exports.get = async (ctx) => {

    var userSession = ctx.session.user || null;
    var userId = userSession._id;
    var user = await User.findById(userId).catch(function(){
      console.log('Error happened when tried to find user in database!');
      ctx.body = 'Error! Try to reload the page';
    });

    if(user  && user.isAdmin) {
      ctx.state.user = user;


      var allUsers =  await User.find();

      try {
        var manageGroup = ctx.request.query.manage
      } catch(e) {}
      if(manageGroup) {

        allUsers.forEach(function(user){
          //if(user.statusInGroup(manageGroup)) {
            user.status = user.statusInGroup(manageGroup);
        //  }
        });
        console.log('statused user is '+allUsers[1]);
        await ctx.render('user/user-index', {allUsers: allUsers, manageGroup: manageGroup});
        return;
      }

      console.log(allUsers[5]);
      ctx.render('user/user-index', {allUsers: allUsers});

    }
    else {
      console.log('user whith such id does not exist');
      ctx.redirect('/');
      return;
    }
}
