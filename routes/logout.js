exports.get = async (ctx) => {
  ctx.session = null;
  ctx.redirect('/');
}
