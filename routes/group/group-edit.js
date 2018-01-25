var Group = require('../../models/group');
var User = require('../../models/user');

exports.post = async (ctx) => {

  var user = ctx.state.user || null;
  var errors = [];
  var access = 0;

  if (user) {
    try {
      var groupTitle = ctx.request.body.groupTitle;
//      var groupTime = ctx.request.body.groupTime;

      var groupToEdit = ctx.request.body.actionGroup;
      var groupTeacher = ctx.request.body.actionUser;

      var groupDescription = ctx.request.body.description;
      var groupContent = ctx.request.body.contentText;
    } catch(e) {
      var error = 'Не верный формат тела запроса';
      errors.push(error);
    }

  //  var user = await User.findById(groupTeacher);
    var userId = user._id.toString();
    var group = await Group.findById(groupToEdit);
    if (group) {
      var groupTeacherId = group.teacher.toString();
      if (groupTeacherId === userId) {
        access = 1;
      }
      if (user.role === 'superuser') {
        access = 2;
      }


      if (access >= 1) {


        if(groupTitle) {
          var newGroup = await Group.findOneAndUpdate({_id: groupToEdit}, {$set: {contentText: groupContent, description: groupDescription, groupName: groupTitle, teacher: groupTeacher}}, {new: true, runValidators: true});
          if(newGroup) {
            ctx.redirect('/group/'+groupToEdit);
            return;
          }
          else {
            var error = 'Не удалось обновить группу';
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
        ctx.render('/group/teacher/error');
        return;
      }

      ctx.body  = 'Не удалось изменить параметры группы! Произошли ошибки: '+errors;
      return;
    }
  }
}
