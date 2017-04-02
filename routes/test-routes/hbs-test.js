exports.get = async (ctx) => {

    var user = ctx.session.user || null;
    ctx.state.user = user;
    console.log(user);

    if (user.group && user.group === 'admin') {
      ctx.render('lk');
    }
    else {
      ctx.redirect('/');
    }

}
