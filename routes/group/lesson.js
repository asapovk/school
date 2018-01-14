var User = require('../../models/user');
var Group = require('../../models/group');
var Lesson = require('../../models/lesson');
exports.get = async (ctx) => {

    var user = ctx.state.user || null;
    var access =0;

    if (user) {

      var userId = user._id.toString();
      console.log('user id is '+userId);
      var lessonId = ctx.params.id;
      var lesson = await Lesson.findById(lessonId).catch(function(){
        console.log('Error happened when tried to find group in database!');
        ctx.body = 'Error! Try to reload the page';
      });
      if(lesson) {
          ctx.state.lesson = lesson;

          var groupId = lesson.group
          var group = await Group.findById(groupId).catch(function(){
            console.log('Error happened when tried to find user in database!');
            ctx.body = 'Error! Try to reload the page';
          });
          var studentsInId = group.studentsIn;
          var studentsInvId = group.studentsInv;
          var studentsAskId = group.studentsAsk;
          var teacherId = group.teacher.toString();

          if(studentsInvId.indexOf(userId) > -1) {
            access = 1;
          }
          if(studentsInId.indexOf(userId) > -1) {
            access = 2;
          }
          if (userId == group.teacher) {
            console.log('Now access should be 3');
            access = 3;
          }
          if(user.role === 'superuser') {
            access = 4;
          }

          var isMember = false;
          var isOwner = false;

          if(access >= 1) {
              //If you are invited to the group
              if (access >= 2) {
                  //If you are member of the group
                  var isMember = true;
                  if (access >= 3) {
                    //If you are owner of the group
                    var isOwner = true;
                    if( access >= 4) {
                      //if you are superuser
                    }
                  }
              }
          }
          var lessonOptions = {
            isOwner: isOwner,
            isMember: isMember,
          };
          console.log('access is '+access);
          //console.log(groupOtions);
          await ctx.render('group/teacher/lesson', lessonOptions);
      }
      else {
            console.log('lesson whith such id is not exist');
            await ctx.redirect('/');
      }
    }
    else {
      console.log('NOT LOGGED IN!');
      await ctx.redirect('/');
    }
}
