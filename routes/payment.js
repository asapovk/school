var crypto = require('crypto');
const sendMail = require('../libs/sendMail');
const mongoose = require('../libs/mongoose');

exports.post = async (ctx) => {
  var phone = ctx.request.body.phone;
  var email = ctx.request.body.email;;
  var sum = ctx.request.body.sum;
  console.log(phone);

  var string = phone+';'+email+';'+sum+';';
  var hash  = crypto.createHash('md5').update(string).digest("hex").toUpperCase();

  let letter = await sendMail({
    template:     'hello',
    subject:      'Привет',
    to:           'astapov@physics.msu.ru',
    name:         'Konstantin'
  });

  ctx.body = hash;
}
