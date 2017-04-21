var User = require('../models/user');
var config = require('config');
var pjson = require('../package.json');

exports.get = async (ctx) => {
    ctx.state.ver =  pjson.version;

    var userSession = ctx.session.user || null;

  //  var user = await User.find({vkId: userSession.vkId});

    console.log(userSession);

    if(userSession) {
      await ctx.redirect('/user/'+userSession._id);
    }

    ctx.state.siteUrl = config.server.siteUrl;
    ctx.state.client_id = config.server.client_id;
    //ctx.body = ctx.renderPug('home', {user12: userSession});
    ctx.render('home');
}
