var crypto = require('crypto');

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


   console.log('Notification successful')
  ctx.body = 'OK';

}
