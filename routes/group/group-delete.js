var Group = require('../../models/group');
var User = require('../../models/user');
var Lesson = require('../../models/lesson');

exports.post = async (ctx) => {
  var access = 0;
  try {
    var groupToDelete = ctx.request.body.actionGroup;
  } catch (e) {
    ctx.body = 'Wrong request body!';
    return;
  }

  var user = ctx.state.user || null;
  if (user) {
        var userId = user._id.toString();
        var group = await Group.findById(groupToDelete);
        if(group) {
            var groupTeacherId = group.teacher.toString();
            if(userId == groupTeacherId) {
              access = 3;
            }
            var groupLessons = await Lesson.find({group: group._id});
            if (group.studentsIn.length === 0 && group.studentsAsk.length === 0  && group.studentsInv.length === 0 && groupLessons.length === 0 && access>=3) {
              var deletedGroup = await Group.findByIdAndRemove(groupToDelete);
              ctx.body  = 'Группа '+group.groupName+' успешно удалена';
              return;
            }
            else {
              ctx.body = 'Вы не можете удалить группу, в которой есть уроки и учащиеся либо приглашенные лица и лица ожидающие обработки запроса на вступление'+
              group.studentsIn.length+group.studentsAsk+group.studentsInv.length+groupLessons.length;
              //console.log(group.studentsAsk);
            }
        }
        else {
          ctx.body = 'Group not found';
          return;
        }
  }
  else {
    ctx.body  = 'User not found';
    return;
  }
}
