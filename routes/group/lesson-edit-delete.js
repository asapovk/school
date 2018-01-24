var Group = require('../../models/group');
var Lesson = require('../../models/lesson');
var User = require('../../models/user');

exports.post = async (ctx) => {
  //Current logged in user
  var user = ctx.state.user || null;
  var userId = user._id.toString();
  var access = 0;

  if (user) {
    var actionLessonId = ctx.params.id;
    var action = ctx.request.body.action;
    // Find lesson object by id param in post URL
    var lesson = await Lesson.findById(actionLessonId);
    if(lesson) {
          var actionGroupId = lesson.group;
          //Find group object by lesson
          var group = await Group.findById(actionGroupId);
          if (group) {
              var groupTeacherId = group.teacher.toString();
              if (groupTeacherId === userId) {
                access = 3;
              }
              if (user.role === 'superuser') {
                access = 4;
              }
              if (action === 'edit' && access >=3) {
                  try{
                    var lessonTitle = ctx.request.body.lessonTitle;
                    var lessonContent = ctx.request.body.lessonContent;
                    var lessonVideo = ctx.request.body.lessonVideo || null;
                    var lessonHometask = ctx.request.body.lessonHometask || null;
                  } catch (err) {
                    ctx.body = err;
                    return;
                  }
                  var newLesson = await Lesson.findOneAndUpdate({ _id: actionLessonId}, {$set:{title: lessonTitle, contentText: lessonContent, contentVideo: lessonVideo, hometask: lessonHometask, group: actionGroupId}}, {new: true});
                  if(newLesson) {
                    ctx.body  = 'Урок успешно изменен!';
                    return;
                  }
                  else {
                    ctx.body = 'Не удалось изменить урок!';
                    return;
                  }
              }
              if (action === 'delete' && access >=3) {
                var deletedLesson = await Lesson.findByIdAndRemove(actionLessonId);
                if(deletedLesson) {
                  ctx.body  = 'Урок успешно удален!';
                  return;
                }
                else {
                  ctx.body  = 'Не удалось удалить урок!';
                  return;
                }
              }
              ctx.body  = 'unknown action or no access rights!';
              return;
            } // End if group
      } // End if lesson
  } //End if user
}
