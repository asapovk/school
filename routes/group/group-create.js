var Group = require('../../models/group');
var User = require('../../models/user');

exports.post = async (ctx) => {

  var errors = [];
  var access = 0;
  try {
    var actionUser = ctx.request.body.actionUser;

    var groupTitle = ctx.request.body.groupTitle;
    //var groupTime = ctx.request.body.groupTime;

    var groupDescription = ctx.request.body.description;
    var groupContent = ctx.request.body.contentText;
  } catch(e) {
    errors.push(e);
  }


  var user = ctx.state.user || null;
  if (user) {
    if (user.role === 'admin' || user.role === 'superuser') {
      access = 1;
    }
    if (access >= 1) {
      if (groupTitle) {
        var newGroup = new Group({groupName: groupTitle, description: groupDescription, teacher: actionUser, contentText: groupContent});
        await newGroup.save()
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
    //ctx.body = 'Группа '+groupTitle+' успешно создана.';
    ctx.redirect('/');
    //var message = 'Группа '+groupTitle+' успешно создана.';
    //ctx.redirect('/?message='+message);
    //ctx.session.message = message;
    //ctx.redirect('/');
  }
  else {
    ctx.body  = 'Не удалось создать группу! Произошли ошибки: '+errors;
  }
}
