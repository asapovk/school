var User = require('../../models/user');
exports.get = async (ctx) => {


    var user = ctx.state.user || null;
    var queryString = ctx.request.query.groupId || null

    if (user) {
      if (user.role === 'admin' || user.role === 'superuser') {
          ctx.render('group/teacher/group-addlesson-form', {groupId: queryString});
          //ctx.body = 'Hi';
      }
      else {
        ctx.body = 'ACCESS DENIED!';
        return;
      }

    }
    else {
      console.log('user whith such id is not exist');
      await ctx.redirect('/');
    }
}
