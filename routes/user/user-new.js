
var User = require('../../models/user');
var Group = require('../../models/group');
exports.get = async (ctx) => {

    var errors = [];
    var access = 0;
    var user = ctx.state.user || null;

    if(user) {
      // Get page owner User object
      var userId = user._id;
      var pageOwnerId = ctx.params.id;
      var pageOwner = await User.findById(pageOwnerId).catch(function(err){
        console.log('Error happened when tried to find user in database!');
        errors.push(err);
      });
      if (pageOwner) {
          if (user.role === 'admin' || user.role === 'superuser') {
            var myGroups = await Group.find({teacher: userId}).catch(function(){
              console.log('Error happened when tried to find students in database!');
              errors.push(err);
            });
            access = 1
          }
          var hisGroups = await Group.find({teacher: pageOwnerId}).catch(function(){
            console.log('Error happened when tried to find students in database!');
            errors.push(err);
          });
          if(hisGroups){
            var groupsIAMIn = user.groupsIn;
            hisGroups.some(function(hisGroup){
              if(groupsIAMIn.indexOf(hisGroup._id)> -1){
                access = 2;
                return true;
              }
            });
          }
          if(myGroups) {
              var hisGroupsIn = pageOwner.groupsIn;
              //console.log('owner groups in are '+hisGroupsIn);
              myGroups.some(function(myGroup){
                if (hisGroupsIn.indexOf(myGroup._id) > -1) {
                  console.log('found groups intersection');
                  access = 2;
                  return true;
                }
              });
          }
          if(user.role === 'superuser') {
            access = 3;
          }

          if(access >= 1 ) {
              //Get list of groups which pgae owner participate
              var groupsIn = await Group.find({'_id' :{$in: pageOwner.groupsIn} }).catch(function(err){
                console.log('Error happened when tried to find students in database!');
                errors.push(err);
              });
              if (access >= 2 ) {
                  var pageOwnerEmail = pageOwner.email;
                  var pageOwnerPnone = pageOwner.phone;
                  if(access >= 3) {
                      // Get list of groups which page owner wants to ented in
                      var groupsAsk = await Group.find({'_id' :{$in: pageOwner.groupsAsk} }).catch(function(err){
                        console.log('Error happened when tried to find students in database!');
                        errors.push(err);
                      });
                      //Get list of groups which page owner was invited in
                      var groupsInv = await Group.find({'_id' :{$in: pageOwner.groupsInv} }).catch(function(err){
                        console.log('Error happened when tried to find students in database!');
                        errors.push(err);
                      });
                      var pageOwnerBalance = pageOwner.balance;
                  }
              }
          }

        pageOwner.balance = pageOwnerBalance;
        pageOwner.email = pageOwnerEmail;
        pageOwner.phone = pageOwnerPnone;


        var userPageOptions = {
            pageOwner: pageOwner,
            groupsIn: groupsIn,
            groupsAsk: groupsAsk,
            groupsInv: groupsInv,
            hisGroups: hisGroups
        };

      //  console.log('access is '+access);
        await ctx.render('user/teacher/user', userPageOptions);
        return;
      }
      else {
        console.log('user whith such id is not exist');
        await ctx.redirect('/');
      }
    }
}
