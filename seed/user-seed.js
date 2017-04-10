var User = require('../models/user');
var mongoose = require('mongoose');

(async function () {
mongoose.connect('localhost:27017/app');

var vasya = new User({
  firstName: 'Вася',
  lastName: 'Васильев',
  vkId: '111111',
  balance: '2700'
});

var kolya = new User({
  firstName: 'Коля',
  lastName: 'Кошкин',
  vkId: '222222',
  balance: '3950'
});

var dima = new User({
  firstName: 'Дима',
  lastName: 'Дудкин',
  vkId: '333333',
  balance: '1270'
});

var petya = new User({
  firstName: 'Петя',
  lastName: 'Пупкин',
  vkId: '444444',
  balance: '130'
});


var nastya = new User({
  firstName: 'Настя',
  lastName: 'Найденова',
  vkId: '555555',
  balance: '-230'
});

var tanya = new User({
  firstName: 'Таня',
  lastName: 'Толстова',
  vkId: '666666',
  balance: '0'
});

var yulya = new User({
  firstName: 'Юля',
  lastName: 'Юсупова',
  vkId: '777777',
  balance: '-10'
});

var grisha = new User({
  firstName: 'Гриша',
  lastName: 'Голышев',
  vkId: '888888',
  balance: '210'
});

var galya = new User({
  firstName: 'Галя',
  lastName: 'Гульдяева',
  vkId: '999999',
  balance: '-500'
});


await vasya.save();
await kolya.save();
await dima.save();
await petya.save();
await nastya.save();
await tanya.save();
await yulya.save();
await grisha.save();
await galya.save();

mongoose.disconnect();
}) ()
