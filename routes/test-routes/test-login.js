var User = require('../../models/user');


exports.get = async (ctx) => {
  //  ctx.session = null;

    var userObject = {
      firstName: 'TEST',
      lastName: 'STUDENT',
      vkId: '1234567890',
      balance: 1000.0
    }

    var user = new User(userObject);

    await User.findOne({vkId: user.vkId}).then( async function(result){
      if(!result) {
        console.log('user is not in database');

      await user.save().catch(function(){
          console.log('unable to save in database');
          ctx.redirect('/');
        });
        ctx.session.user = result
      }
      else {
        console.log('User is registered');
        ctx.session.user = result;
      }
    }).catch(function(){
      console.log('Failed seach user in database');
    });


    var date = new Date();

    var dateString = date.toISOString();

    console.log(dateString);

    ctx.redirect('/');

    //ctx.set('Content-Type', 'application/xml');

    //ctx.body = '<checkOrderResponse performedDatetime="'+dateString+'" code="0" invoiceId="1234567" shopId="13"/>'
}
