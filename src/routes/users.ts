/// <reference path='../../typings/tsd.d.ts' />


import express = require('express');
var router = express.Router();
import mongoose = require('mongoose'); 
import {IUserModel, User} from '../models/User';
import userService = require('../services/user-service');
import passport = require('passport');

var restrict = require('../auth/restrict');

// Param Precondiction for reuse name parameter
router.param('username', function(req, res, next, username) {
	User.find({ username: username }, (err, docs) => {
		if (err) {
			var er = new Error('User Not Found');
			next(err);
		} else {
			req.user = docs[0];
			next();
		}
	});
});
//seurured route with restrict
router.get('/', restrict, (req, res) => {
	User.find({}, (err, docs) => {
		var vm = {
			title: 'Users',
			users: docs,
			firstName: req.user ? req.user.firstname : null
		};

		res.render('user_index', vm);
	});
}).post('/login', function(req, res, next){
	  if(req.body.rememberMe) {
		  req.session.cookie.maxAge = 30 * 24 * 3600 * 1000
	  }
	  next();
},passport.authenticate('local', {
	successRedirect: '/dashboard',
	failureRedirect: '/signin',
	failureFlash: 'Invalid Credentials'
})).get('/logout', function(req, res, next) {

	req.logout();
	res.redirect('/');

}).post('/', (req, res) => {
	//create 
	userService.addUser(req.body, function(err) {
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
		req.login(req.body, function() {
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

}).get('/:username', (req, res) => {
	//show
	res.render('user_show', { user: req.user });

}).get('/:username/edit', (req, res) => {
	//edit
	console.log(req.user);
	res.render('user_edit', { user: req.user });

}).put('/:username', (req, res) => {
	//update
	var b = req.body;
	User.update(
	{
		username: req.params.username
	},
	{
		firstname: b.firstname,
		lastname: b.lastname,
		username: b.username,
		email: b.email
	},
	(err, user) => {

		res.send(err);
	});

}).delete('/:username', (req, res) => {
	//destroy
	User.remove({ firstname: req.params.username }, () => {
		res.redirect('/users');
	});

});


export  = router;