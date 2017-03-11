exports.get = async (ctx) => {
  ctx.session.user = null;
  ctx.redirect('/');
}
