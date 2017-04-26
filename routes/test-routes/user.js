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

      var pageOwnerId = ctx.params.id;
      var pageOwner = await User.findById(pageOwnerId).catch(function(){
        console.log('Error happened when tried to find user in database!');
        ctx.body = 'Error! Try to reload the page';
      });
      if (pageOwner) {
        var groupsIn = await Group.find({'_id' :{$in: pageOwner.groupsIn} }).catch(function(){
          console.log('Error happened when tried to find students in database!');
          ctx.body = 'Error! Try to reload the page';
        });
        var groupsAsk = await Group.find({'_id' :{$in: pageOwner.groupsAsk} }).catch(function(){
          console.log('Error happened when tried to find students in database!');
          ctx.body = 'Error! Try to reload the page';
        });
        var groupsInv = await Group.find({'_id' :{$in: pageOwner.groupsInv} }).catch(function(){
          console.log('Error happened when tried to find students in database!');
          ctx.body = 'Error! Try to reload the page';
        });
        /*
          CODE HERE
        */
        await ctx.render('user', {pageOwner: pageOwner, groupsIn: groupsIn, groupsAsk: groupsAsk, groupsInv: groupsInv});
        return;
      }
      else {
        console.log('user whith such id is not exist');
        await ctx.redirect('/');
      }
    }
}
