var Group = require('../../models/group');
var User = require('../../models/user');
var Lesson = require('../../models/lesson');

exports.post = async (ctx) => {

  var errors = [];
  var access = 0;
  try {
    var groupToDelete = ctx.request.body.actionGroup;
    var actionUser = ctx.request.body.actionUser;
  } catch (e) {
    errors.push(e);
  }

  var user = ctx.state.user || null;
  if (user) {
      var userId = user._id.toString();
      var group = await Group.findById(groupToDelete).catch(function(err){
          errors.push(err);
      });
      if(group) {
          var groupTeacherId = group.teacher.toString();
          if(userId === groupTeacherId) {
            access = 1;
          }
          if(user.role === 'superuser') {
            access = 2;
          }
          if (access >= 1) {
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
            var accessError = 'ACCESS DENIED!';
            console.log('ACCESS DENIED');
            errors.push(accessError);
          }
      }
      else {
        var noGoupError = 'Не удалось найти группу с указанным идентификатором!';
        errors.push(noGoupError);
      }


      if (errors.length === 0) {
        //First we need to get rid of all the lessons of the groups
        //The we have to remove from all members of the group, all invited users and
        // all the users asked for membership this group from corrsponding lists
        //Finally we delete the group itself.

        // 1) Cancel all invites

        // 2) Reject all asks

        // 3) kickout all members

        // 4) Remove for teacher's own groups list
        if (group.studentsIn === [] && group.studentsAsk ===[] && group.studentsInv === [] && group.lessons === []) {
          var deletedGroup = await Group.findByIdAndRemove(groupToDelete);
          ctx.body  = 'Группа '+group.groupName+' успешно удалена';
          return;
        }
        else {
          ctx.body = 'Вы не можете удалить группу, в которой есть уроки и учащиеся либо приглашенные лица и лица ожидающие обработки запроса на вступление'
        }

      }
      else {
        console.log(errors);
        ctx.body  = 'Не удалось удалить группу! Произошли ошибки: '+errors;
        return;
      }

    }
}
