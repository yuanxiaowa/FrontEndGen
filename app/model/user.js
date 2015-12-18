var mongoose = require('mongoose'),
    UserSchema = require('../schema/user'),
    User = mongoose.model('User', UserSchema);

module.exports = User;