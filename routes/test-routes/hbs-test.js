exports.get = async (ctx) => {

    var user = ctx.session.user || null;
    ctx.state.user = user;
    console.log(user);

    if (user != null) {
      ctx.render('lk');
    }
    else {
      ctx.redirect('/');
    }

}
