var User = require('../models/user');
var mongoose = require('mongoose');
var rp = require('request-promise');

async function dosmth () {

  var userId = '2385621'

  var groupId = 'akadplus'

  var optionsUser = {
    method: 'GET',
    uri: 'https://api.vk.com/method/users.get',
    qs: {
      user_ids: userId,
      fields: 'bdate',
      v: '5.62'
    },
    json: true
  }

  var optionsGroup = {
    method: 'GET',
    uri: 'https://api.vk.com/method/groups.getMembers',
    qs: {
      group_id: groupId,
      fields: ['city', 'sex', 'photo_100'],
      v: '5.62'
    },
    json: true
  }

  var resp = await rp(optionsGroup);

  console.log(resp.response.items[4]);

}

dosmth();


/*

(async function () {
mongoose.connect('localhost:27017/appTest', {
  user: 'astapovk.ru',
  pass: 'Tgdhzq2AQuUn7l55smDu',
  auth: {authdb:"appTest"},
  server: {
  socketOptions: {
      keepAlive: 1
    },
    poolSize:      5
  }
});

var galya = new User({
  firstName: 'Галя',
  lastName: 'Гульдяева',
  vkId: '999999',
  balance: '-500'
});


await galya.save();

mongoose.disconnect();
}) ()

*/
