var User = require('../../models/user');
var Group = require('../../models/group');
exports.get = async (ctx) => {

    var errors = [];
    var user = ctx.state.user || null;

    if(user) {
      // Get page owner User object
      var userId = user._id;
      var access = null;
      var pageOwnerId = ctx.params.id;
      var pageOwner = await User.findById(pageOwnerId).catch(function(err){
        console.log('Error happened when tried to find user in database!');
        errors.push(err);
      });
      if (user.role === 'admin') {
        var myGroups = await Group.find({teacher: userId}).catch(function(){
          console.log('Error happened when tried to find students in database!');
          errors.push(err);
        });
      }
      if(myGroups) {
          var hisGroupsIn = pageOwner.groupsIn;
          console.log('owner groups in are '+hisGroupsIn);
          myGroups.some(function(myGroup){
            if (hisGroupsIn.indexOf(myGroup._id) > -1) {
              console.log('found groups intersection');
              access = 'teacher';
              return true;
            }
          });
        }
      if (pageOwner) {

        if(access === 'teacher') {
            //Get list of groups which pgae owner participate
            var groupsIn = await Group.find({'_id' :{$in: pageOwner.groupsIn} }).catch(function(err){
              console.log('Error happened when tried to find students in database!');
              errors.push(err);
            });
            // Get list of groups which page owner wants to ented in
            var groupsAsk = await Group.find({'_id' :{$in: pageOwner.groupsAsk} }).catch(function(err){
              console.log('Error happened when tried to find students in database!');
              errors.push(err);
            });
            //Get list og groups which page owner was invited in
            var groupsInv = await Group.find({'_id' :{$in: pageOwner.groupsInv} }).catch(function(err){
              console.log('Error happened when tried to find students in database!');
              errors.push(err);
            });
            // Get list of groups which page owner created as teacher
            var hisGroups = await Group.find({teacher: pageOwnerId}).catch(function(){
              console.log('Error happened when tried to find students in database!');
              errors.push(err);
            });
            //if(pageOwner)
        }

        console.log('access is '+access);
        await ctx.render('user/teacher/user', {pageOwner: pageOwner, groupsIn: groupsIn, groupsAsk: groupsAsk, groupsInv: groupsInv, hisGroups: hisGroups});
        return;
      }
      else {
        console.log('user whith such id is not exist');
        await ctx.redirect('/');
      }

    }
}
