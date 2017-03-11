var session = require('koa-session');
var convert = require('koa-convert');

exports.init = app => app.use(convert(session(app)));
