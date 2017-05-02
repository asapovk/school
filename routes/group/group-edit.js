var Group = require('../../models/group');
var User = require('../../models/user');

exports.post = async (ctx) => {

  var errors = [];

  try {
    var groupTitle = ctx.request.body.groupTitle;
    var groupTime = ctx.request.body.groupTime;

    var groupToEdit = ctx.request.body.actionGroup;
    var groupTeacher = ctx.request.body.actionUser;
  }catch(e) {
    var error = 'Не верный формат тела запроса';
    errors.push(error);
  }

  var user = await User.findById(groupTeacher);
  var group = await Group.findById(groupToEdit);

  if (user && group && group.teacher == user.id) {

    if(groupTitle && groupTime) {
      var newGroup = await Group.findOneAndUpdate({_id: groupToEdit}, {$set: {time: groupTime, groupName: groupTitle, teacher: groupTeacher}}, {new: true});
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
    var error = 'Не удалось найти пользователя, не удалось найти группу, пользовталь не является администратором данной группы';
    errors.push(error);
  }

  ctx.body  = 'Не удалось изменить параметры группы! Произошли ошибки: '+errors;
  return;


}
