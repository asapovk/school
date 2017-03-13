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
        redirect_uri: 'http://oknojapan.com:3000/login',
        code: code
      },
      json: true
    }
    var user = null;
    await rp(options).then(response => {
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
    }).then(response => {
        console.log(response)
        try {
             userName = response.response[0].first_name;
         } catch(e) {
            console.log('failed to set userName');
         }
         if(userName) {

          user = {
            firstName: response.response[0].first_name,
            lastName: response.response[0].last_name,
            vkId: response.response[0].id.toString(),
            balance: 0.0
          }
          return User.findOne({
            vkId: user.vkId
          })
        }
        else {
          console.log('VK response data format is incorrect!');
        }
    }).then(function(){
      console.log('user is registered');
      console.log(user);
      ctx.session.user = user
    }).catch(function (err){
      if(err.received === 0) {
       throw User.save(user)
      }
    }).catch(function(){
        ctx.session.user = user;
        console.log('user is writtn in the session');
    });
    ctx.redirect('/');
  }

}
