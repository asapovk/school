var User = require('../../models/user');
var Group = require('../../models/group');
exports.get = async (ctx) => {

    var userSession = ctx.session.user || null;

    var userId = userSession._id;
    var user = await User.findById(userId).catch(function(){
      console.log('Error happened when tried to find user in database!');
      ctx.body = 'Error! Try to reload the page';
    });

    if (user) {
      ctx.state.user = user;
      /*
      CODE HERE
      */

      var groupId = ctx.params.id;
      var group = await Group.findById(groupId).catch(function(){
        console.log('Error happened when tried to find group in database!');
        ctx.body = 'Error! Try to reload the page';
      });


      if(group) {

          ctx.state.group = group;
          try {
            var isGroupEdit = ctx.request.query.edit
          } catch(e) {}
          if(isGroupEdit) {
            await ctx.render('group-create-edit-form');
            return;
          }

          console.log(isGroupEdit);
            var teacher = await User.findById(group.teacher).catch(function(){
              console.log('Error happened when tried to find user in database!');
              ctx.body = 'Error! Try to reload the page';
            });
            console.log(teacher);
            var studentsIn = await User.find({'_id' :{$in: group.studentsIn} }).catch(function(){
              console.log('Error happened when tried to find students in database!');
              ctx.body = 'Error! Try to reload the page';
            });
            var studentsAsk = await User.find({'_id' :{$in: group.studentsAsk} }).catch(function(){
              console.log('Error happened when tried to find students in database!');
              ctx.body = 'Error! Try to reload the page';
            });
            var studentsInv = await User.find({'_id' :{$in: group.studentsInv} }).catch(function(){
              console.log('Error happened when tried to find students in database!');
              ctx.body = 'Error! Try to reload the page';
            });

            //console.log(students);
            await ctx.render('group', {teacher: teacher, studentsIn: studentsIn, studentsAsk: studentsAsk, studentsInv: studentsInv});
      }
      else {
            console.log('group whith such id is not exist');
            await ctx.redirect('/');
      }

      /*
      CODE HERE
      */

    }
    else {
      console.log('user whith such id is not exist');
      console.log(user);
      await ctx.redirect('/');
    }


}
