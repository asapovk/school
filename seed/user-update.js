var User = require('../models/user');
var mongoose = require('mongoose');

(async function () {
mongoose.connect('localhost:27017/app');

await User.findOneAndUpdate({vkId: '2385621'}, {$set: {role: 'admin'}}, {new: true})

mongoose.disconnect();
}) ()
