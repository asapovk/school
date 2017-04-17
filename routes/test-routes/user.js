var User = require('../../models/user');
var Group = require('../../models/group');
exports.get = async (ctx) => {

    var userSession = ctx.session.user || null;

    var userId = ctx.params.id;

    var user = await User.findById(userId).catch(function(){
      console.log('Error happened when tried to find user in database!');
      ctx.body = 'Error! Try to reload the page';
    });

    if (user) {
      ctx.state.user = user;
      console.log(user);
      /*
        CODE HERE
      */
      var allGroups = await Group.find().catch(function(){
        console.log('Error happened when tried to find groups in database!');
        ctx.body = 'Error! Try to reload the page';
      });
      /*
        CODE HERE
      */
      await ctx.render('user', {allGroups: allGroups});
      return;
    }
    else {
      console.log('user whith such id is not exist');
      console.log(user);
      await ctx.redirect('/');
    }


}
