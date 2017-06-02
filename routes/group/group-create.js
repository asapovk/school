var Group = require('../../models/group');
var User = require('../../models/user');

exports.post = async (ctx) => {

  var errors = [];
  var access = 0;
  try {
    var actionUser = ctx.request.body.actionUser;

    var groupTitle = ctx.request.body.groupTitle;
    //var groupTime = ctx.request.body.groupTime;

    var groupDay = ctx.request.body.groupDay;
    var groupHour = ctx.request.body.groupHour;
    var groupMinute = ctx.request.body.groupMinute;
  } catch(e) {
    errors.push(e);
  }
  console.log('Group time is '+groupMinute);
  console.log('Group time is '+groupHour);
  console.log('Group time is '+groupDay);



  var groupTime = {
    day: groupDay,
    hour: groupHour,
    minute: groupMinute
  }

  var user = ctx.state.user || null;
  if (user) {
    if (user.role === 'admin' || user.role === 'superuser') {
      access = 1;
    }
    if (access >= 1) {
      if (groupTitle && groupTime) {
        var newGroup = new Group({groupName: groupTitle, time: groupTime, teacher: actionUser });
        await newGroup.save()
        //.then(function (result) {
        //  if (result) {
        //    ctx.body = 'Группа '+result.groupName+' успешно создана.';
        //    return;
        //  }
        //})
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
      var accessError = 'ACCESS DENIED!'
      console.log('ACCESS DENIED!');
      errors.push(accessError);
    }
  }
  else {
    var error = 'Не найден пользователь с заданным индентификатором.'
    errors.push(error);
  }

  if(errors.length === 0) {
    ctx.body = 'Группа '+groupTitle+' успешно создана.';
    //var message = 'Группа '+groupTitle+' успешно создана.';
    //ctx.redirect('/?message='+message);
    //ctx.session.message = message;
    //ctx.redirect('/');
  }
  else {
    ctx.body  = 'Не удалось создать группу! Произошли ошибки: '+errors;
  }
}
