var Group = require('../../models/group');
var User = require('../../models/user');

exports.post = async (ctx) => {

  var errors = [];
  try {
    var actionUser = ctx.request.body.actionUser;

    var groupTitle = ctx.request.body.groupTitle;
    var groupTime = ctx.request.body.groupTime;

    var groupDay = 'Mod';
    var groupHour = 12;
    var groupMinute = 45;
  } catch(e) {
    errors.push(e);
  }
  console.log('Group time is '+groupTime);

  var groupTime = {
    day: groupDay,
    hour: groupHour,
    minute: groupMinute
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
          ctx.body = 'Группа '+result.groupName+' успешно создана.';
          return;
        }
      })
      .catch(function(err){
        errors.push(err);
      //  console.log(err);
      });
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
