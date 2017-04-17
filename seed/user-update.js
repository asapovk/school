var User = require('../models/user');
var mongoose = require('mongoose');

(async function () {
mongoose.connect('localhost:27017/app');

await User.findOneAndUpdate({vkId: '19681019'}, {$set: {role: 'admin'}}, {new: true})

mongoose.disconnect();
}) ()
