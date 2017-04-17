var Group = require('../models/group');
var mongoose = require('mongoose');

(async function () {
mongoose.connect('localhost:27017/app');

var fizika = new Group ({
  groupName: 'Подготовка к олимпиаде по физике',
  time: 'Пятница 18:00-18:30',
  teacher: '58ee9075c92e333ee63c5eb5', 
  students: ['58ea67a886d2c42539d97aa7',
  '58ea67a886d2c42539d97aa8',
  '58ea67a886d2c42539d97aa9',
  '58ea67a886d2c42539d97aaa',
  '58ea67a886d2c42539d97aab',
  '58ea67a886d2c42539d97aac',
  '58ea67a886d2c42539d97aad']
});

await fizika.save();
mongoose.disconnect();
}) ()
