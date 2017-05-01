var User = require('../../models/user');

exports.post = async (ctx) => {
    var usersToCharge = ctx.request.body.usersToCharge;
    var numberOfUsers = usersToCharge.length;
    var teacherToAccept = ctx.request.body.teacherToAccept;
    var chargeValue = ctx.request.body.chargeValue;
    var totalSumAmount = chargeValue*numberOfUsers;

    var students = await User.update({'_id' :{$in: usersToCharge} },  {$inc: {balance: -1*chargeValue}}, {multi: true} ).catch(function(){
      console.log('Error happened when tried to find students in database!');
      ctx.body = 'Error! Try to reload the page';
    });

    var teacher = await User.findOneAndUpdate({ _id: teacherToAccept}, {$inc: {balance: totalSumAmount}}, {new: true}).catch(function(){
      console.log('Error happened when tried to find students in database!');
      ctx.body = 'Error! Try to reload the page';
    });

    ctx.body = 'Successful charge by '+chargeValue;
}
