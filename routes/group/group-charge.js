var User = require('../../models/user');
var Group = require('../../models/group');

exports.post = async (ctx) => {
    var usersToCharge = ctx.request.body.usersToCharge;
    var numberOfUsers = usersToCharge.length;
    var teacherToAccept = ctx.request.body.teacherToAccept;
    var chargeValue = ctx.request.body.chargeValue;
    var totalSumAmount = chargeValue*numberOfUsers;
    var groupToCharge = ctx.request.body.groupToCharge;

    var group = await Group.findById(groupToCharge).catch(function(){
      console.log('Error happened when tried to find group in database!');
      ctx.body = 'Error! Try to reload the page';
    });

    if(group) {
      var date = new Date();
      var dateString = date.toUTCString();

      var teacherChargeInfo = 'Прием оплаты на сумму '+totalSumAmount+' руб. с группы '+group.groupName+' '+dateString;

      var teacher = await User.findOneAndUpdate({ _id: teacherToAccept}, {$inc: {balance: totalSumAmount}, $addToSet: {payhistory: teacherChargeInfo}}, {new: true}).catch(function(){
        console.log('Error happened when tried to find students in database!');
        ctx.body = 'Error! Try to reload the page';
      });


      var studentChargeInfo = 'Списание '+chargeValue+' руб. в счет оплаты занятия в группе '+group.groupName+' '+dateString;

      var students = await User.update({'_id' :{$in: usersToCharge} },  {$inc: {balance: -1*chargeValue},  $addToSet: {payhistory: studentChargeInfo}}, {multi: true} ).catch(function(){
        console.log('Error happened when tried to find students in database!');
        ctx.body = 'Error! Try to reload the page';
      });
      ctx.body = 'Succsessfully charged group';
      return;
    }
    else {
      ctx.body = 'Error happened! failed to find group';
    }
}
