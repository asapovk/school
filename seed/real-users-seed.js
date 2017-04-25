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
      fields: ['city', 'country', 'sex', 'bdate', 'photo_100', 'photo_200'],
      v: '5.62'
    },
    json: true
  }

  var resp = await rp(optionsGroup);



  //console.log(resp.response.items[4]);

  var users = resp.response.items;
  console.log(users[2])
  return users;

}

dosmth().then(usersToSave=>{
//  console.log(result[1]);

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

  usersToSave.forEach( async function(userToSave){
    if(userToSave.city) {
      var city = userToSave.city.title
    }
    else {
      var city = 'none'
    }
    if(userToSave.country) {
      var country = userToSave.country.title
    }
    else {
      var country = 'none'
    }
    var newUser = new User({
      vkId: userToSave.id,
      firstName: userToSave.first_name,
      lastName: userToSave.last_name,
      city: city,
      country: country,
      photo_100: userToSave.photo_100,
      photo_200: userToSave.photo_200
    });
    console.log(newUser);
    await newUser.save();
  });

  mongoose.disconnect();

});
