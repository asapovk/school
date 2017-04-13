var Group = require('../models/group');
var mongoose = require('mongoose');

(async function () {
mongoose.connect('localhost:27017/app');

await Group.findOneAndUpdate({_id: "58ebdc8da7311c4cf02e8048"}, {$set: {teacher: "58ee9075c92e333ee63c5eb5"}}, {new: true})

mongoose.disconnect();
}) ()
