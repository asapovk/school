var crypto = require('crypto');

exports.post = (ctx) => {
  try {
    var shoId = ctx.request.body.shoId;
    var scid = ctx.request.body.scid;
    var customerNumber = ctx.request.body.customerNumber;
    var orderSumAmount = ctx.request.body.orderSumAmount;
    var invoiceId = ctx.request.body.invoiceId;
    var action = ctx.request.body.action;
    var orderSumCurrencyPaycash = ctx.request.body.orderSumCurrencyPaycash;
    var orderSumBankPaycash = ctx.request.body.orderSumBankPaycash;
    var md5 = ctx.request.body.md5;
  } catch (e) {
    console.log('Failed to check payment since incorrect request body');
    ctx.body = '<checkOrderResponse performedDatetime="'+dateString+'" code="200" invoiceId="'+invoiceId+'" shopId="'+shoId+'"/>';
  }

  var shopPassword = '';

  var string = action+';'+orderSumAmount+';'+orderSumCurrencyPaycash+';'+orderSumBankPaycash+';'+shoId+';'+invoiceId+';'+customerNumber+';'+shopPassword;
  var hash  = crypto.createHash('md5').update(string).digest("hex").toUpperCase();

  if (hash === md5) {

    console.log('successful hash check!');

    var date = new Date();

    var dateString = date.toISOString();

    console.log(dateString);

    ctx.set('Content-Type', 'application/xml');

    ctx.body = '<checkOrderResponse performedDatetime="'+dateString+'" code="0" invoiceId="'+invoiceId+'" shopId="'+shoId+'"/>';

  }

  else {

    console.log('hash does not match md5 parameter!');

    ctx.body = '<checkOrderResponse performedDatetime="'+dateString+'" code="1" invoiceId="'+invoiceId+'" shopId="'+shoId+'"/>'
  }


}
