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


      try {
        var isUserEdit = ctx.request.query.edit
      } catch(e) {}
      if(isUserEdit) {
        await ctx.render('user/student/user-edit-form');
        return;
      }

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
        if(userId === pageOwnerId) {
          var myPage = true
        }

        else {
          var myPage = false
        }

        var myGroups = null;
        if(myPage && user.isAdmin) {
          myGroups = await Group.find({teacher: userId}).catch(function(){
            console.log('Error happened when tried to find students in database!');
            ctx.body = 'Error! Try to reload the page';
          });
        }

        try {
          var message = ctx.session.message
        } catch (e) {
          var message = null;
        }
        if(message){
          ctx.session.message = null;
        }
        //console.log('message is '+message);

        await ctx.render('user/teacher/user', {pageOwner: pageOwner, groupsIn: groupsIn, groupsAsk: groupsAsk, groupsInv: groupsInv, myPage: myPage, myGroups: myGroups, message: message});
        return;
      }
      else {
        console.log('user whith such id is not exist');
        await ctx.redirect('/');
      }
    }
}
