var User = require('../models/user');


exports.init = app => app.use( async (ctx, next) => {


  var userSession = ctx.session.user || null;

  try {
    var userId = userSession._id;
  } catch(e) {
    console.log('Error on reading _id property at userSession');
  }

  var user = await User.findById(userId).catch(function(err){
    console.log(err);
  });
  if (user) {
      ctx.state.user = user;
  }


 await next();

});
