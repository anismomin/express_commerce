/// <reference path='../../typings/tsd.d.ts' />
var express = require('express');
var router = express.Router();
var User_1 = require('../models/User');
var userService = require('../services/user-service');
var passport = require('passport');
var restrict = require('../auth/restrict');
// Param Precondiction for reuse name parameter
router.param('username', function (req, res, next, username) {
    User_1.User.find({ username: username }, function (err, docs) {
        if (err) {
            var er = new Error('User Not Found');
            next(err);
        }
        else {
            req.user = docs[0];
            next();
        }
    });
});
//seurured route with restrict
router.get('/', restrict, function (req, res) {
    User_1.User.find({}, function (err, docs) {
        var vm = {
            title: 'Users',
            users: docs,
            firstName: req.user ? req.user.firstname : null
        };
        res.render('user_index', vm);
    });
}).post('/login', function (req, res, next) {
    if (req.body.rememberMe) {
        req.session.cookie.maxAge = 30 * 24 * 3600 * 1000;
    }
    next();
}, passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin',
    failureFlash: 'Invalid Credentials'
})).get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
}).post('/', function (req, res) {
    //create 
    userService.addUser(req.body, function (err) {
        if (err) {
            var vm = {
                title: 'Create New User',
                input: req.body,
                error: err
            };
            delete vm.input.password;
            return res.render('signup', vm);
        }
        //redirect to secure route after signup new account
        req.login(req.body, function () {
            res.redirect('/dashboard');
        });
        //res.redirect('/users/' + req.body.username);
    });
    ////Crate new user via simple way
    // var b = req.body;
    // new User({
    // 	firstname: b.firstname,
    // 	lastname: b.lastname,
    // 	email: b.email,
    // 	password: b.password,
    // }).save((err, docs) => {
    // 	if (err) res.json(err);
    // 	res.redirect('/users/' + docs.firstname);
    // });
}).get('/:username', function (req, res) {
    //show
    res.render('user_show', { user: req.user });
}).get('/:username/edit', function (req, res) {
    //edit
    console.log(req.user);
    res.render('user_edit', { user: req.user });
}).put('/:username', function (req, res) {
    //update
    var b = req.body;
    User_1.User.update({
        username: req.params.username
    }, {
        firstname: b.firstname,
        lastname: b.lastname,
        username: b.username,
        email: b.email
    }, function (err, user) {
        res.send(err);
    });
}).delete('/:username', function (req, res) {
    //destroy
    User_1.User.remove({ firstname: req.params.username }, function () {
        res.redirect('/users');
    });
});
module.exports = router;
