var User = require('../../models/user');

exports.post = async (ctx) => {
    var usersToCharge = ctx.request.body.usersToCharge;
    var chargeValue = ctx.request.body.chargeValue;

    var students = await User.update({'_id' :{$in: usersToCharge} },  {$inc: {balance: -1*chargeValue}}, {multi: true} ).catch(function(){
      console.log('Error happened when tried to find students in database!');
      ctx.body = 'Error! Try to reload the page';
    });

    ctx.body = 'Successful charge by'+chargeValue;
}
