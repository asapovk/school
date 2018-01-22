var User = require('../../models/user');
var Group = require('../../models/group');

exports.post = async (ctx) => {

    var user = ctx.state.user || null;
    var access =0;
    if (user) {

      var userId = user._id.toString();

      try {
        var actionGroupId = ctx.params.id;
        var actionUserId = ctx.request.body.actionUserId;
        var action = ctx.request.body.action;
      } catch (err) {
        console.log(err);
        return;
      }

      var group = await Group.findById({'_id': actionGroupId});
      if (group) {

        var teacherId = group.teacher;

        if (userId == teacherId) {
          console.log('Now access should be 3');
          access = 3;
        }
        if(user.role === 'superuser') {
          access = 4;
        }


        if(action === 'invite' && access >=3) {

          var usersToInvite = [actionUserId];
          var students = await User.update({'_id' :{$in: usersToInvite} },  {$addToSet: {groupsInv: actionGroupId}}, {multi: true} ).catch(function(){
            console.log('Unabled to push group to students');
            ctx.body = 'Error! Try to reload the page';
          });

          var group = await Group.findOneAndUpdate({ _id: actionGroupId}, {$addToSet: {studentsInv: {$each: usersToInvite} } }).catch(function(err){
            console.log('Unable to push students to group!');
            console.log(err);
            ctx.body = 'Error! Try to reload the page';
          });
        }

        if(action === 'ask') {

          var groupsToAsk = [actionGroupId];
          var groups = await Group.update({'_id' :{$in: groupsToAsk} },  {$addToSet: {studentsAsk: userId}}, {multi: true} ).catch(function(){
            console.log('Unabled to push group to students');
            ctx.body = 'Error! Try to reload the page';
          });

          var student = await User.findOneAndUpdate({ _id: userId}, {$addToSet: {groupsAsk: {$each: groupsToAsk} } }).catch(function(err){
            console.log('Unable to push students to group!');
            console.log(err);
            ctx.body = 'Error! Try to reload the page';
          });
        }

        if(action === 'kickout' && access >=3) {
          console.log('kickout works');
          console.log(actionUserId);
          console.log(actionGroupId);
          var group = await Group.findOneAndUpdate({ _id:  actionGroupId},  {$pull: {studentsIn: actionUserId}}).catch(function(){
            console.log('Unabled to push group to students');
            ctx.body = 'Error! Try to reload the page';
          });

          var student = await User.findOneAndUpdate({ _id: actionUserId}, {$pull: {groupsIn: actionGroupId} }).catch(function(err){
            console.log('Unable to push students to group!');
            console.log(err);
            ctx.body = 'Error! Try to reload the page';
          });


        }
        if( action === 'reject-user' && access >=3) {

          var group = await Group.findOneAndUpdate({ _id:  actionGroupId},  {$pull: {studentsAsk: actionUserId}}).catch(function(){
            console.log('Unabled to push group to students');
            ctx.body = 'Error! Try to reload the page';
          });

          var student = await User.findOneAndUpdate({ _id: actionUserId}, {$pull: {groupsAsk: actionGroupId} }).catch(function(err){
            console.log('Unable to push students to group!');
            console.log(err);
            ctx.body = 'Error! Try to reload the page';
          });

        }
        if( action === 'approve-user' && access >=3) {

          var group = await Group.findOneAndUpdate({ _id:  actionGroupId},  {$pull: {studentsAsk: actionUserId}, $addToSet: {studentsIn: actionUserId}}).catch(function(){
            console.log('Unabled to push group to students');
            ctx.body = 'Error! Try to reload the page';
          });

          var student = await User.findOneAndUpdate({ _id: actionUserId}, {$pull: {groupsAsk: actionGroupId}, $addToSet: {groupsIn: actionGroupId} }).catch(function(err){
            console.log('Unable to push students to group!');
            console.log(err);
            ctx.body = 'Error! Try to reload the page';
          });

        }
        if(action === 'cancel-invite' && access >=3) {
          console.log('cansel-invite works')
          // This cancels ask of group's teacher to certain user for his membership in this group
          var group = await Group.findOneAndUpdate({ _id:  actionGroupId},  {$pull: {studentsInv: actionUserId}}).catch(function(){
            console.log('Unabled to push group to students');
            ctx.body = 'Error! Try to reload the page';
          });

          var student = await User.findOneAndUpdate({ _id: actionUserId}, {$pull: {groupsInv: actionGroupId} }).catch(function(err){
            console.log('Unable to push students to group!');
            console.log(err);
            ctx.body = 'Error! Try to reload the page';
          });

        }

        if(action === 'leave')  {

          var student = await User.findOneAndUpdate({ _id:  userId},  {$pull: {groupsIn: actionGroupId}}).catch(function(){
            console.log('Unabled to push group to students');
            ctx.body = 'Error! Try to reload the page';
          });

          var group = await Group.findOneAndUpdate({ _id: actionGroupId}, {$pull: {studentsIn: userId} }).catch(function(err){
            console.log('Unable to push students to group!');
            console.log(err);
            ctx.body = 'Error! Try to reload the page';
          });
        }

        if (action === 'reject-group') {
          console.log('reject group works');
          var student = await User.findOneAndUpdate({ _id:  userId},  {$pull: {groupsInv: actionGroupId}}).catch(function(){
            console.log('Unabled to push group to students');
            ctx.body = 'Error! Try to reload the page';
          });

          var group = await Group.findOneAndUpdate({ _id: actionGroupId}, {$pull: {studentsInv: userId} }).catch(function(err){
            console.log('Unable to push students to group!');
            console.log(err);
            ctx.body = 'Error! Try to reload the page';
          });

        }
        if(action==='approve-group')  {
          var student = await User.findOneAndUpdate({ _id:  userId},  {$pull: {groupsInv: actionGroupId}, $addToSet: {groupsIn: actionGroupId}}).catch(function(){
            console.log('Unabled to push group to students');
            ctx.body = 'Error! Try to reload the page';
          });

          var group = await Group.findOneAndUpdate({ _id: actionGroupId}, {$pull: {studentsInv: userId}, $addToSet: {studentsIn: userId} }).catch(function(err){
            console.log('Unable to push students to group!');
            console.log(err);
            ctx.body = 'Error! Try to reload the page';
          });

        }
        if(action === 'cancel-ask') {
        // This cancels user's ask for membership of certain group  by user himself
          var student = await User.findOneAndUpdate({ _id:  userId},  {$pull: {groupsAsk: actionGroupId}}).catch(function(){
            console.log('Unabled to push group to students');
            ctx.body = 'Error! Try to reload the page';
          });

          var group = await Group.findOneAndUpdate({ _id: actionGroupId}, {$pull: {studentsAsk: userId} }).catch(function(err){
            console.log('Unable to push students to group!');
            console.log(err);
            ctx.body = 'Error! Try to reload the page';
          });
        }

        ctx.body = access;

      } //end of group
    } //end of user
    return;
}
