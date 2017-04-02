var crypto = require('crypto');
const sendMail = require('../../libs/sendMail');
const mongoose = require('../../libs/mongoose');
var User = require('../../models/user');

exports.post = async (ctx) => {
  var phone = ctx.request.body.phone;
  var email = ctx.request.body.email;
  var sum = ctx.request.body.sum;
  var vkId = ctx.request.body.customerNumber;
  console.log(vkId);

  var string = phone+';'+email+';'+sum+';';
  var hash  = crypto.createHash('md5').update(string).digest("hex").toUpperCase();

  if (sum >= 0 && vkId) {
    await User.findOneAndUpdate({vkId: vkId}, {$inc: {balance: sum}}, {new: true}).then(function (result){
      console.log(result);
      if(result) {
        ctx.session.user = result;
      }
    }).catch(function(err){
      ctx.body ='<checkOrderResponse performedDatetime="2011-05-04T20:38:01.000+04:00" code="0" invoiceId="1234567" shopId="13"/>';
    });
  }

  else {
    console.log('Sum has incorrect value! or no customerNumber');
  }
/*
  let letter = await sendMail({
    template:     'hello',
    subject:      'Привет',
    to:           'astapov@physics.msu.ru',
    name:         'Konstantin'
  });
*/
  ctx.body = hash;
}
