var User = require('../../models/user');
exports.get = async (ctx) => {

    var user = ctx.session.user || null;
    ctx.state.user = user;
    console.log(user);

    if (user != null) {
      var users = await User.find();
      ctx.render('lk', {users: users});
    }
    else {
      ctx.redirect('/');
    }

}
