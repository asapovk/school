var User = require('../models/user');
var Group = require('../models/group');
var config = require('config');

exports.get = async (ctx) => {

  var user = ctx.state.user || null;

  if(user) {
    console.log(user);
    var userId = user._id;
    var groupsIn = await Group.find({'_id' :{$in: user.groupsIn} }).catch(function(err){
      console.log('Error happened when tried to find students in database!');
      errors.push(err);
    });
    // Get list of groups which user wants to ented in
    var groupsAsk = await Group.find({'_id' :{$in: user.groupsAsk} }).catch(function(err){
      console.log('Error happened when tried to find students in database!');
      errors.push(err);
    });
    //Get list og groups which user was invited in
    var groupsInv = await Group.find({'_id' :{$in: user.groupsInv} }).catch(function(err){
      console.log('Error happened when tried to find students in database!');
      errors.push(err);
    });
    // Get list og groups which user created as teacher
    var myGroups = await Group.find({teacher: userId}).catch(function(){
      console.log('Error happened when tried to find students in database!');
      errors.push(err);
    });

      await ctx.render('user/teacher/my', {groupsIn: groupsIn, groupsAsk: groupsAsk, groupsInv: groupsInv, myGroups: myGroups});
  }
  else {

    ctx.state.siteUrl = config.server.siteUrl;
    ctx.state.client_id = config.server.client_id;

    ctx.render('home');
  }
    //ctx.render('home');
}
