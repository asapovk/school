var crypto = require('crypto');

exports.post = async (ctx) => {
  ctx.set('Content-Type', 'application/xml');
  var date = new Date();
  var dateString = date.toISOString();
/*
  let letter = await sendMail({
    template:     'hello',
    subject:      'Привет',
    to:           'astapov@physics.msu.ru',
    name:         'Konstantin'
  });
*/

  try {
    var shoId = ctx.request.body.shoId;
    var customerNumber = ctx.request.body.customerNumber;
    var invoiceId = ctx.request.body.invoiceId;
    var action = ctx.request.body.action;

    var orderSumAmount = ctx.request.body.orderSumAmount;
    var orderSumCurrencyPaycash = ctx.request.body.orderSumCurrencyPaycash;
    var orderSumBankPaycash = ctx.request.body.orderSumBankPaycash;

    var md5 = ctx.request.body.md5;



    var requestDatetime = ctx.request.body.requestDatetime;
    var shopArticleId = ctx.request.body.shopArticleId;
    var orderCreatedDatetime =  ctx.request.body.orderCreatedDatetime;
    var shopSumAmount = ctx.request.body.shopSumAmount;
    var shopSumCurrencyPaycash = ctx.request.body.shopSumCurrencyPaycash;
    var shopSumBankPaycash = ctx.request.body.shopSumBankPaycash;
    var paymentDatetime = ctx.request.body.paymentDatetime;
    var paymentPayerCode = ctx.request.body.paymentPayerCode;
    var paymentType = ctx.request.body.paymentType;
    var cps_user_country_code = ctx.request.body.cps_user_country_code;



  } catch (e) {
    console.log('Failed notification. Incorrect request body');
    ctx.body = '<checkOrderResponse performedDatetime="'+dateString+'" code="200" invoiceId="'+invoiceId+'" shopId="'+shoId+'"/>';
  }
  var shopPassword = '';

  var string = action+';'+orderSumAmount+';'+orderSumCurrencyPaycash+';'+orderSumBankPaycash+';'+shoId+';'+invoiceId+';'+customerNumber+';'+shopPassword;
  var hash  = crypto.createHash('md5').update(string).digest("hex").toUpperCase();

  if (hash === md5) {

    await User.findOneAndUpdate({vkId: customerNumber}, {$inc: {balance: orderSumAmount}}, {new: true}).then(function (result){
        if(result) {
          ctx.session.user = result;
          console.log('Successful order check!')
          ctx.body = '<checkOrderResponse performedDatetime="'+dateString+'" code="0" invoiceId="'+invoiceId+'" shopId="'+shoId+'"/>';
        }
        else {
          console.log('Failed check. No result from database!');
          ctx.body = '<checkOrderResponse performedDatetime="'+dateString+'" code="100" invoiceId="'+invoiceId+'" shopId="'+shoId+'"/>';
        }
    }).catch(function(err){
        console.log('Failed check. Mongoose error. Unable to write payment to database!');
        ctx.body ='<checkOrderResponse performedDatetime="'+dateString+'" code="100" invoiceId="'+invoiceId+'" shopId="'+shoId+'"/>';
    });

    console.log('Successful notification');
    ctx.body = '<checkOrderResponse performedDatetime="'+dateString+'" code="0" invoiceId="'+invoiceId+'" shopId="'+shoId+'"/>';
  }
  else {
    console.log('Failed notification. Hash does not match md5 parameter!');
    ctx.body = '<checkOrderResponse performedDatetime="'+dateString+'" code="1" invoiceId="'+invoiceId+'" shopId="'+shoId+'"/>'
  }

}
