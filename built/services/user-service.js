var User_1 = require('../models/User');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync();
exports.addUser = function (user, next) {
    bcrypt.hash(user.password, salt, function (err, hash) {
        (function (err) { return next(err); });
        var newUser = new User_1.User({
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email.toLowerCase(),
            password: hash
        });
        newUser.save(function (err) {
            if (err)
                return next(err);
            next(null);
        });
    });
};
exports.findUser = function (email, next) {
    //findOne is also available in mongo shell and native driver
    User_1.User.findOne({ email: email.toLowerCase() }, function (err, user) {
        //passing both err and user to next callback
        next(err, user);
    });
};
