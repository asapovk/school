var config = require('config');
var User = require('../../models/user');

exports.get = async (ctx) => {

  var date = new Date();
  var dateString = date.toISOString();

  var userSession = ctx.session.user || null;
  var userId = userSession._id;
  var user = await User.findById(userId).catch(function(){
    console.log('Error happened when tried to find user in database!');
    ctx.body = 'Error! Try to reload the page';
  });

  if (user) {
    ctx.state.user = user;
    //ctx.body = ctx.renderPug('tinkoff-checkout', {user12: user, currentTime: dateString});
    ctx.render('checkout', {currentTime: dateString});
  }
  else {
    ctx.redirect('/');
  }

}
