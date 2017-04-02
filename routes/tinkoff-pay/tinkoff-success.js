exports.get = async (ctx) => {

  if (ctx.session.user != null) {
    var user = ctx.session.user
    ctx.body = ctx.renderPug('tinkoff-success', {user12: user});
  }
  else {
    ctx.redirect('/');
  }

}
