var rp = require('request-promise');
var User = require('../models/user');
var config = require('config');

exports.get = async (ctx) => {


  try {
     var code = ctx.request.query.code;
  } catch(e) {}
  if (code == undefined ) {

    console.log('No authetification code');
    ctx.redirect('/');

  }
  else {
    console.log(code);
    var options = {
      method: 'GET',
      uri: 'https://oauth.vk.com/access_token',
      qs: {
        client_id: config.server.client_id,
        client_secret: config.server.client_secret,
        redirect_uri: config.server.siteUrl+'/login',
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
      var user = null;
    }

    await User.findOne({vkId: userObject.vkId}).then( async function(result){
      if(!result) {
        console.log('user is not in database');
      user = new User(userObject);
      await user.save().catch(function(){
          console.log('unable to save in database');
          ctx.redirect('/');
        });
        console.log('now user is created');
        ctx.session.user = user;
        var userId = user.id;
        ctx.redirect('/'+userId);
        return;
      }
      else {
        console.log('User is registered');
        ctx.session.user = result;
        user = result;
        ctx.redirect('/user/'+userId);
        return;
      }
    }).catch(function(){
      console.log('Failed seach user in database');
    });


    ctx.redirect('/user/'+user.id);
  }

}
