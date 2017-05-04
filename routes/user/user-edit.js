var User = require('../../models/user');

exports.post = async (ctx) => {

  var errors = [];

  try {
    var userEmail = ctx.request.body.userEmail;
    var userPhone = ctx.request.body.userPhone;
    var userToEdit = ctx.request.body.actionUser;

  }catch(e) {
    var error = 'Не верный формат тела запроса';
    errors.push(error);
  }

  var user = await User.findById(userToEdit);

  if (user) {

    var newUser = await User.findOneAndUpdate({_id: userToEdit}, {$set: {email: userEmail, phone: userPhone}}, {new: true}).catch(function(err){
      errors.push(err);
    });
  }
  else {
    var error = 'Не удалось найти пользователя';
    errors.push(error);
  }
  if(errors.length > 0) {
      ctx.body  = 'Не удалось изменить параметры группы! Произошли ошибки: '+errors;
  }
  else {
    ctx.body  = 'Данные профиля успешно изменены';
  }
}
