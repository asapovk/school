var User = require('../../models/user');
var Group = require('../../models/group');

exports.post = async (ctx) => {

    var user = ctx.state.user || null;

    if (user) {

      console.log('user role is '+user.role);

      var userToIncome = ctx.request.body.userToIncome;
      var groupsToAsk = ctx.request.body.groupsToAsk;

      var userToManage = ctx.request.body.userToManage;
      var groupToLeave = ctx.request.body.groupToLeave;
      var groupToReject = ctx.request.body.groupToReject;
      var groupToApprove = ctx.request.body.groupToApprove;
      var groupToCancel = ctx.request.body.groupToCancel;

      if (user.role === 'admin' || user.role === 'superuser') {

        var groupToAccept = ctx.request.body.groupToAccept;
        var usersToInvite = ctx.request.body.usersToInvite;

        var groupToManage = ctx.request.body.groupToManage
        var userToKickout = ctx.request.body.userToKickout;
        var userToReject = ctx.request.body.userToReject;
        var userToApprove = ctx.request.body.userToApprove;
        var userToCancel = ctx.request.body.userToCancel;

      }



  /*
      console.log(groupToAccept);
      console.log(usersToInvite);
      console.log(userToIncome);
      console.log(groupsToAsk);
  */
      if(groupToAccept && usersToInvite) {

        var students = await User.update({'_id' :{$in: usersToInvite} },  {$addToSet: {groupsInv: groupToAccept}}, {multi: true} ).catch(function(){
          console.log('Unabled to push group to students');
          ctx.body = 'Error! Try to reload the page';
        });

        var group = await Group.findOneAndUpdate({ _id: groupToAccept}, {$addToSet: {studentsInv: {$each: usersToInvite} } }).catch(function(err){
          console.log('Unable to push students to group!');
          console.log(err);
          ctx.body = 'Error! Try to reload the page';
        });
      }

      if(userToIncome && groupsToAsk) {

        var groups = await Group.update({'_id' :{$in: groupsToAsk} },  {$addToSet: {studentsAsk: userToIncome}}, {multi: true} ).catch(function(){
          console.log('Unabled to push group to students');
          ctx.body = 'Error! Try to reload the page';
        });

        var student = await User.findOneAndUpdate({ _id: userToIncome}, {$addToSet: {groupsAsk: {$each: groupsToAsk} } }).catch(function(err){
          console.log('Unable to push students to group!');
          console.log(err);
          ctx.body = 'Error! Try to reload the page';
        });
      }

      if(userToKickout && groupToManage) {
        console.log('userToKickout : '+userToKickout);
        console.log('groupToManage : '+groupToManage);

        var group = await Group.findOneAndUpdate({ _id:  groupToManage},  {$pull: {studentsIn: userToKickout}}).catch(function(){
          console.log('Unabled to push group to students');
          ctx.body = 'Error! Try to reload the page';
        });

        var student = await User.findOneAndUpdate({ _id: userToKickout}, {$pull: {groupsIn: groupToManage} }).catch(function(err){
          console.log('Unable to push students to group!');
          console.log(err);
          ctx.body = 'Error! Try to reload the page';
        });


      }
      if(userToReject && groupToManage) {
        console.log('userToReject : '+userToReject);
        console.log('groupToManage : '+groupToManage);

        var group = await Group.findOneAndUpdate({ _id:  groupToManage},  {$pull: {studentsAsk: userToReject}}).catch(function(){
          console.log('Unabled to push group to students');
          ctx.body = 'Error! Try to reload the page';
        });

        var student = await User.findOneAndUpdate({ _id: userToReject}, {$pull: {groupsAsk: groupToManage} }).catch(function(err){
          console.log('Unable to push students to group!');
          console.log(err);
          ctx.body = 'Error! Try to reload the page';
        });

      }
      if(userToApprove && groupToManage) {
        console.log('userToApprove : '+userToApprove);
        console.log('groupToManage : '+groupToManage);

        var group = await Group.findOneAndUpdate({ _id:  groupToManage},  {$pull: {studentsAsk: userToApprove}, $addToSet: {studentsIn: userToApprove}}).catch(function(){
          console.log('Unabled to push group to students');
          ctx.body = 'Error! Try to reload the page';
        });

        var student = await User.findOneAndUpdate({ _id: userToApprove}, {$pull: {groupsAsk: groupToManage}, $addToSet: {groupsIn: groupToManage} }).catch(function(err){
          console.log('Unable to push students to group!');
          console.log(err);
          ctx.body = 'Error! Try to reload the page';
        });

      }
      if(userToCancel && groupToManage) {
        console.log('userToCancel : '+userToCancel);
        console.log('groupToManage : '+groupToManage);

        var group = await Group.findOneAndUpdate({ _id:  groupToManage},  {$pull: {studentsInv: userToCancel}}).catch(function(){
          console.log('Unabled to push group to students');
          ctx.body = 'Error! Try to reload the page';
        });

        var student = await User.findOneAndUpdate({ _id: userToCancel}, {$pull: {groupsInv: groupToManage} }).catch(function(err){
          console.log('Unable to push students to group!');
          console.log(err);
          ctx.body = 'Error! Try to reload the page';
        });

      }

      if(groupToLeave && userToManage)  {
        console.log('groupToLeave : '+groupToLeave);
        console.log('userToManage : '+userToManage);

        var student = await User.findOneAndUpdate({ _id:  userToManage},  {$pull: {groupsIn: groupToLeave}}).catch(function(){
          console.log('Unabled to push group to students');
          ctx.body = 'Error! Try to reload the page';
        });

        var group = await Group.findOneAndUpdate({ _id: groupToLeave}, {$pull: {studentsIn: userToManage} }).catch(function(err){
          console.log('Unable to push students to group!');
          console.log(err);
          ctx.body = 'Error! Try to reload the page';
        });
      }

      if (groupToReject && userToManage) {
        console.log('groupToReject : '+groupToReject);
        console.log('userToManage : '+userToManage);

        var student = await User.findOneAndUpdate({ _id:  userToManage},  {$pull: {groupsInv: groupToReject}}).catch(function(){
          console.log('Unabled to push group to students');
          ctx.body = 'Error! Try to reload the page';
        });

        var group = await Group.findOneAndUpdate({ _id: groupToReject}, {$pull: {studentsInv: userToManage} }).catch(function(err){
          console.log('Unable to push students to group!');
          console.log(err);
          ctx.body = 'Error! Try to reload the page';
        });

      }
      if(groupToApprove && userToManage)  {
        console.log('groupToApprove : '+groupToApprove);
        console.log('userToManage : '+userToManage);

        var student = await User.findOneAndUpdate({ _id:  userToManage},  {$pull: {groupsInv: groupToApprove}, $addToSet: {groupsIn: groupToApprove}}).catch(function(){
          console.log('Unabled to push group to students');
          ctx.body = 'Error! Try to reload the page';
        });

        var group = await Group.findOneAndUpdate({ _id: groupToApprove}, {$pull: {studentsInv: userToManage}, $addToSet: {studentsIn: userToManage} }).catch(function(err){
          console.log('Unable to push students to group!');
          console.log(err);
          ctx.body = 'Error! Try to reload the page';
        });

      }
      if(groupToCancel && userToManage) {
        console.log('groupToCancel : '+groupToCancel);
        console.log('userToManage : '+userToManage);

        var student = await User.findOneAndUpdate({ _id:  userToManage},  {$pull: {groupsAsk: groupToCancel}}).catch(function(){
          console.log('Unabled to push group to students');
          ctx.body = 'Error! Try to reload the page';
        });

        var group = await Group.findOneAndUpdate({ _id: groupToCancel}, {$pull: {studentsAsk: userToManage} }).catch(function(err){
          console.log('Unable to push students to group!');
          console.log(err);
          ctx.body = 'Error! Try to reload the page';
        });
      }

      ctx.body = 'SUCCESS';
    }


}
