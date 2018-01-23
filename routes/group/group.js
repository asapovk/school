var User = require('../../models/user');
var Group = require('../../models/group');
var Lesson = require('../../models/lesson');
exports.get = async (ctx) => {

    var user = ctx.state.user || null;
    var access =0;

    if (user) {

      var userId = user._id.toString();
      console.log('user id is '+userId);
      var groupId = ctx.params.id;
      var group = await Group.findById(groupId).catch(function(){
        console.log('Error happened when tried to find group in database!');
        ctx.body = 'Error! Try to reload the page';
      });
      if(group) {
          ctx.state.group = group;
          var studentsInId = group.studentsIn;
          var studentsInvId = group.studentsInv;
          var studentsAskId = group.studentsAsk;
          try {
            var isGroupEdit = ctx.request.query.edit
          } catch(e) {}
          if(isGroupEdit) {
            await ctx.render('group/teacher/group-create-edit-form');
            return;
          }


          var teacher = await User.findById(group.teacher).catch(function(){
            console.log('Error happened when tried to find user in database!');
            ctx.body = 'Error! Try to reload the page';
          });
          var teacherId = group.teacher.toString();
          console.log('teacher id is '+teacher._id);
//
          var groupLessons = await Lesson.find({group: group._id}).catch(function(){
            console.log('Error happened when tried to find lessons in database!');
            ctx.body = 'Error! Try to reload the page';
          });
//
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

          if(access >= 1) {
              if (access >= 2) {
                  var studentsIn = await User.find({'_id' :{$in: group.studentsIn} }).catch(function(){
                    console.log('Error happened when tried to find students in database!');
                    ctx.body = 'Error! Try to reload the page';
                  });
                  studentsIn.forEach(function(student) {
                    student.balance = null;
                  });
                  if (access >= 3) {
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
                    if( access < 4) {

                      studentsAsk.forEach(function(student) {
                        if (student.balance > 0) {
                            student.balance = null;
                        }
                        else {
                            student.balance = -1;
                        }
                      });
                      studentsInv.forEach(function(student) {
                        if (student.balance > 0) {
                            student.balance = null;
                        }
                        else {
                            student.balance = -1;
                        }
                      });
                      studentsIn.forEach(function(student) {
                        console.log('students in chancge baaknce!');
                        if (student.balance > 0) {
                            student.balance = null;
                        }
                        else {
                            student.balance = -1;
                        }
                      });
                    }
                  }
              }
          }
          var groupOtions = {
            teacher: teacher,
            studentsIn: studentsIn,
            studentsInv: studentsInv,
            studentsAsk: studentsAsk,
            lessons: groupLessons
          };
          console.log('access is '+access);
          //console.log(groupOtions);
          await ctx.render('group/teacher/group', groupOtions);
      }
      else {
            console.log('group whith such id is not exist');
            await ctx.redirect('/');
      }
    }
    else {
      console.log('NOT LOGGED IN!');
      await ctx.redirect('/');
    }
}
