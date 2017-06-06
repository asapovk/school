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
          fields: ['city', 'country', 'sex', 'bdate', 'photo_100', 'photo_200'],
          v: '5.62'
        },
        json: true
      }
     return rp(options2);
    });
    var options3 = {
      method: 'GET',
      uri: 'https://api.vk.com/method/groups.getMembers',
      qs: {
        group_id: 'akadplus',
        v: '5.62'
      //  fields: 'sex'
      },
      json: true
    }
    var userLoginnig = response.response[0].id;
    var userObject = {
      firstName: response.response[0].first_name,
      lastName: response.response[0].last_name,
      vkId: response.response[0].id.toString(),
      city: response.response[0].city.title,
      country: response.response[0].country.title,
      photo_100: response.response[0].photo_100,
      photo_200: response.response[0].photo_200,
      balance: 0.0
    }
    var options3 = {
      method: 'GET',
      uri: 'https://api.vk.com/method/groups.isMember',
      qs: {
        group_id: 'akadplus',
        user_id: userLoginnig.toString()
      //  fields: 'sex'
      },
      json: true
    }
    var response3 = await rp(options3);
    console.log(response3.response);
    var options4 = {
      method: 'GET',
      uri: 'https://api.vk.com/method/groups.isMember',
      qs: {
        group_id: 'akadprofessors',
        user_id: userLoginnig.toString()
      //  fields: 'sex'
      },
      json: true
    }
    var response4 = await rp(options4);
    if (userObject) {
      var user = null;
    }
    if(response3.response === 1 || response4.response === 1){
      await User.findOne({vkId: userObject.vkId}).then( async function(result){
        if(!result) {
                console.log('user is not in database');
                if(response4.response === 1) {
                  userObject.role = 'admin';
                }
                else {
                  userObject.role = 'student';
                }
                user = new User(userObject);
                await user.save().catch(function(){
                  console.log('unable to save in database');
                  ctx.redirect('/');
                });

                console.log('now user is created');
                ctx.session.user = user;
                var userId = user.id;
                ctx.redirect('/');
                return;
        }
        else {
            console.log('User is registered');
            ctx.session.user = result;
            user = result;
            ctx.redirect('/');
            return;
        }
      }).catch(function(){
        console.log('Failed seach user in database');
      });
      ctx.redirect('/');

    }

    else {
      console.log('YOU ARE NOT IN THE GROUP!');
      ctx.body = 'Вы не являетесь участнком группы VK, для входа в личный кабинет вступите в группу https://vk.com/akadplus';
    }
  }
}
