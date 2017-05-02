var Group = require('../../models/group');
var User = require('../../models/user');

exports.post = async (ctx) => {

  var errors = [];
  try {
    var actionUser = ctx.request.body.actionUser;

    var groupTitle = ctx.request.body.groupTitle;
    var groupTime = ctx.request.body.groupTime;
  } catch(e) {
    errors.push(e);
  }

  var user = await User.findById(actionUser).catch(function(err){
      errors.push(err);
  });

  if (user) {
    if (groupTitle && groupTime) {
      var newGroup = new Group({groupName: groupTitle, time: groupTime, teacher: actionUser });
      await newGroup.save()
      .then(function (result) {
        if (result) {
          ctx.body = 'Группа '+result.groupName+' успешно создана.'
        }
      })
      .catch(function(err){
        errors.push(err);
      });
      return;
    }
    else {
      var error = 'Пустые поля не допустимы!';
      errors.push(error);
    }
  }
  else {
    var error = 'Не найден пользователь с заданным индентификатором.'
    errors.push(error);
  }

  ctx.body  = 'Не удалось создать группу! Произошли ошибки: '+errors;

}
