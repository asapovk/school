var User = require('../models/user');

exports.get = async (ctx) => {

    var userSession = ctx.session.user || null;

  //  var user = await User.find({vkId: userSession.vkId});

    console.log(userSession);

    if(userSession) {
      await ctx.redirect('/user/'+userSession._id);
    }

    //ctx.body = ctx.renderPug('home', {user12: userSession});
    ctx.render('home');
}
