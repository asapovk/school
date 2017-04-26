var User = require('../../models/user');
var Group = require('../../models/group');

exports.post = async (ctx) => {

    var groupToAccept = ctx.request.body.groupToAccept;
    var usersToInvite = ctx.request.body.usersToInvite;

    var userToIncome = ctx.request.body.userToIncome;
    var groupsToAsk = ctx.request.body.groupsToAsk;

    console.log(groupToAccept);
    console.log(usersToInvite);
    console.log(userToIncome);
    console.log(groupsToAsk);

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


    ctx.body = 'Successful charge by ';
}
