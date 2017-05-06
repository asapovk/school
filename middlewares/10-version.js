var pjson = require('../package.json');

exports.init = app => app.use( async (ctx, next) => {
  ctx.state.ver =  pjson.version;

 await next();

});
