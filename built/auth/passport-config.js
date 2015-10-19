/// <reference path='../../typings/tsd.d.ts' />
module.exports = function () { };
var passport = require('passport');
var passport_local = require('passport-local');
var bcrypt = require('bcryptjs');
var userService = require('../services/user-service');
passport.use(new passport_local.Strategy({ usernameField: 'email' }, function (email, password, next) {
    userService.findUser(email, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(null, null);
        }
        console.log(password);
        bcrypt.compare(password, user.password, function (err, same) {
            console.log(same);
            if (err) {
                return next(err);
            }
            if (!same) {
                return next(null, null);
            }
            next(null, user);
        });
    });
    passport.serializeUser(function (user, next) {
        next(null, user.email);
    });
    passport.deserializeUser(function (email, next) {
        userService.findUser(email, function (err, user) {
            next(err, user);
        });
    });
}));
;
