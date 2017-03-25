exports.get = async (ctx) => {

  if (ctx.session.user != null) {
    var user = ctx.session.user
    ctx.body = ctx.render('tinkoff-checkout', {user12: user});
  }
  else {
    ctx.redirect('/');
  }

}
