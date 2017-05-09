var crypto = require('crypto');
var User = require('../../models/user');

exports.post = async (ctx) => {
  ctx.set('Content-Type', 'application/json');
/*
  let letter = await sendMail({
    template:     'hello',
    subject:      'Привет',
    to:           'astapov@physics.msu.ru',
    name:         'Konstantin'
  });
*/

  try {
    var TerminalKey = ctx.request.body.TerminalKey;
    var OrderId = ctx.request.body.OrderId;
    var Success = ctx.request.body.Success;
    var Status = ctx.request.body.Status;
    var PaymentId = ctx.request.body.PaymentId;
    var ErrorCode = ctx.request.body.ErrorCode;
    var Amount = ctx.request.body.Amount;
    var RebillId = ctx.request.body.RebillId;
    var CardId = ctx.request.body.CardId;
    var Pan = ctx.request.body.Pan;
    var Token = ctx.request.body.Token;

  } catch (e) {
    console.log('Failed notification. Incorrect request body');
    ctx.body = 'NOT_GOOD';
  }


     console.log('Notification successful');
     console.log(Status);
     console.log(PaymentId);
     console.log(Amount);
     console.log(Token);
     console.log(OrderId);

    var userId = OrderId.substr(0, OrderId.indexOf('@'));
    var orderSumAmount = Amount/100.0;
    console.log(userId);
    console.log(orderSumAmount);

  var Password = 'nxg1spkd144wgjop';
  var string = Amount+CardId+ErrorCode+Pan+OrderId+Password+PaymentId+RebillId+Status+Success+TerminalKey;
  var hash = crypto.createHash('sha256').update(string).digest('hex');
  console.log(hash);

  if(Status === 'CONFIRMED') {

    var date = new Date();
    var dateString = date.toUTCString();
    var payInfo = dateString+' Пополнение баланса на сумму '+orderSumAmount+' руб.';

    await User.findOneAndUpdate({vkId: userId}, {$inc: {balance: orderSumAmount}, $addToSet: {payhistory: payInfo}}, {new: true}).then(function (result){
        if(result) {

          //Can not update session with post request!!!
          ctx.session.user = result;
          console.log(result);
          console.log('Successful written to database!')
          ctx.body = 'OK';
        }
        else {
          console.log('Failed check. No result from database!');
          ctx.body = 'NOT_GOOD';
        }
    }).catch(function(err){
        console.log('Failed check. Mongoose error. Unable to write payment to database!');
        ctx.body ='NOT_GOOD';
    });
  }

  ctx.body = 'OK';

}
