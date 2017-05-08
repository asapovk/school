var User = require('../../models/user');

exports.post = async (ctx) => {
    var usersToCharge = ctx.request.body.usersToCharge;
    var numberOfUsers = usersToCharge.length;
    var teacherToAccept = ctx.request.body.teacherToAccept;
    var chargeValue = ctx.request.body.chargeValue;
    var totalSumAmount = chargeValue*numberOfUsers;

    var teacher = await User.findOneAndUpdate({ _id: teacherToAccept}, {$inc: {balance: totalSumAmount}}, {new: true}).catch(function(){
      console.log('Error happened when tried to find students in database!');
      ctx.body = 'Error! Try to reload the page';
    });

    var date = new Date();
    var dateString = date.toUTCString();
    var chargeInfo = dateString+' '+teacher.firstName+' '+teacher.lastName+' Charged by '+chargeValue;

    var students = await User.update({'_id' :{$in: usersToCharge} },  {$inc: {balance: -1*chargeValue},  $addToSet: {payhistory: chargeInfo}}, {multi: true} ).catch(function(){
      console.log('Error happened when tried to find students in database!');
      ctx.body = 'Error! Try to reload the page';
    });


    ctx.body = 'Successful charge by '+chargeValue;
}
