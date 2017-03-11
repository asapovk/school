var rp = require('request-promise');


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
    var userName;
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
           ctx.session.user = response.response[0]
           console.log(ctx.session.user);
         }
    });
    //ctx.body = ctx.session.user;
    ctx.redirect('/');
  }

}
