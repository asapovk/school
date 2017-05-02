var Group = require('../../models/group');
var User = require('../../models/user');

exports.post = async (ctx) => {

  var errors = [];
  try {
    var groupToDelete = ctx.request.body.actionGroup;
    var actionUser = ctx.request.body.actionUser;
  } catch (e) {
    errors.push(e);
  }

  var group = await Group.findById(groupToDelete).catch(function(err){
      errors.push(err);
  });
  var user = await User.findById(actionUser).catch(function(err){
      errors.push(err);
  });

  if(user && group && group.teacher == user.id) {
    var studentsIn = group.studentsIn;
    var studentsAsk = group.studentsAsk;
    var studentsInv = group.studentsInv;

    if (studentsIn) {
      var students = await User.update({'_id' :{$in: studentsIn} }, {$pull: {groupsIn: groupToDelete}}, {multi: true}).catch(function(err){
        errors.push(err);
      });
      if(!students) {
        var noStudentsInError = 'Не удалось найти студентов входящих в эту группу';
        errors.push(noStudentsInError);
      }
    }

    if (studentsAsk) {
      var students = await User.update({'_id' :{$in: studentsAsk} }, {$pull: {groupsAsk: groupToDelete}}, {multi: true}).catch(function(err){
        errors.push(err);
      });
      if(!students) {
        var noStudentsAskError = 'Не удалось найти студентов отправивших запрос на добавление в эту группу';
        errors.push(noStudentsAskError);
      }
    }

    if (studentsInv) {
      var students = await User.update({'_id' :{$in: studentsInv} }, {$pull: {groupsInv: groupToDelete}}, {multi: true}).catch(function(err){
        error.push(err);
      });
      if(!students) {
        var noStudentsInvError = 'Не удалось найти студентов приглашенных в эту группу';
        errors.push(noStudentsInvError);
      }
    }

  }
  else {
    var noGoupError = 'Не удалось найти группу с указанным идентификатором!';
    errors.push(noGoupError);
  }





  if (errors.length === 0) {
    var deletedGroup = await Group.findByIdAndRemove(groupToDelete);
    ctx.body  = 'Группа '+group.groupName+' успешно удалена';
    return;
  }
  else {
    console.log(errors);
    ctx.body  = 'Не удалось удалить группу! Произошли ошибки: '+errors;
    return;
  }

  //ctx.body  = 'End of request';
}
