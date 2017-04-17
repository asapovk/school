var hbs = require('koa-hbs');
var config = require('config');
var convert = require('koa-convert');

exports.init = app => app.use(
  hbs.middleware({
    viewPath: config.view.root,
    partialsPath: config.view.root+'/partials',
    defaultLayout: 'layout'
}));
