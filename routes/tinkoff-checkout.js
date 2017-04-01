exports.get = async (ctx) => {

  var date = new Date();
  var dateString = date.toISOString();

  if (ctx.session.user != null) {
    var user = ctx.session.user
    ctx.body = ctx.render('tinkoff-checkout', {user12: user, currentTime: dateString});
  }
  else {
    ctx.redirect('/');
  }

}
