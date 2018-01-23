var Group = require('../../models/group');
var Lesson = require('../../models/lesson');
var User = require('../../models/user');

exports.post = async (ctx) => {

  var user = ctx.state.user || null;
  var errors = [];
  var access = 0;

  if (user) {
    try {
      var actionUser = ctx.request.body.actionUser;
      var actionGroup = ctx.request.body.actionGroup;

      var lessonTitle = ctx.request.body.lessonTitle;
      var lessonContent = ctx.request.body.lessonContent;
      var lessonHometask = ctx.request.body.lessonHometask || null;

    } catch(e) {
      var error = 'Не верный формат тела запроса';
      errors.push(error);
    }

  //  var user = await User.findById(groupTeacher);
    var userId = user._id.toString();
    var group = await Group.findById(actionGroup);
    if (group) {
      var groupTeacherId = group.teacher.toString();
      if (groupTeacherId === userId) {
        access = 1;
      }
      if (user.role === 'superuser') {
        access = 2;
      }


      if (access >= 1) {

        if(lessonTitle && lessonContent) {
          var newLesson = new Lesson({title: lessonTitle, contentText: lessonContent, hometask: lessonHometask, group: actionGroup});
          await newLesson.save();

          if(newLesson) {
            ctx.body = 'урок успешно создан';
            return;
          }
          else {
            var error = 'Не удалось создать урок';
            errors.push(error);
          }
        }
        else {
          var error = 'Не корректные данные';
          errors.push(error);
        }
      }
      else {
        var error = 'ACCESS DENIED!';
        console.log('ACCESS DENIED!');
        errors.push(error);
      }

      ctx.body  = 'Не удалось создать урок! Произошли ошибки: '+errors;
      return;
    }
  }
}
