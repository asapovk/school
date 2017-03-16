var rp = require('request-promise');
var User = require('../models/user');

exports.get = async (ctx) => {
  try {
     var code = ctx.request.query.code;
  } catch(e) {}
  if (code == undefined ) {

    ctx.body = 'No authetification code';

  }
  else {
    console.log(code);
    var options = {
      method: 'GET',
      uri: 'https://oauth.vk.com/access_token',
      qs: {
        client_id: '5895475',
        client_secret: 'CWWUwXFXOOw1UCJXIjef',
        redirect_uri: 'http://akadplus.astapovk.ru/login',
        code: code
      },
      json: true
    }
    var user = null;
    var response = await rp(options).then(response => {
      var options2 = {
        method: 'GET',
        uri: 'https://api.vk.com/method/users.get',
        qs: {
          user_ids: response.user_id,
          fields: 'bdate',
          v: '5.62'
        },
        json: true
      }
     return rp(options2);
    });

    var userObject = {
      firstName: response.response[0].first_name,
      lastName: response.response[0].last_name,
      vkId: response.response[0].id.toString(),
      balance: 0.0
    }

    if (userObject) {
      var user = new User(userObject);
    }

    await User.findOne({vkId: user.vkId}).then( async function(result){
      if(!result) {
        console.log('user is not in database');

      await user.save().catch(function(){
          console.log('unable to save in database');
          ctx.redirect('/');
        });
        ctx.session.user = userObject;
      }
      else {
        console.log('User is registered');
        ctx.session.user = result;
      }
    }).catch(function(){
      console.log('Failed seach user in database');
    });


    ctx.redirect('/');
  }

}