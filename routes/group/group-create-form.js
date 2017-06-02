var User = require('../../models/user');
exports.get = async (ctx) => {

//    var userSession = ctx.session.user || null;

//    var userId = userSession._id;
//    var user = await User.findById(userId).catch(function(){
//      console.log('Error happened when tried to find user in database!');
//      ctx.body = 'Error! Try to reload the page';
//    });


    var user = ctx.state.user || null;


    if (user) {
      if (user.role === 'admin' || user.role === 'superuser') {
          ctx.render('group/teacher/group-create-edit-form');
      }
      else {
        console.log('ACCESS DENIED!');
        await ctx.redirect('/');
      }

    }
    else {
      console.log('user whith such id is not exist');
      await ctx.redirect('/');
    }
}
