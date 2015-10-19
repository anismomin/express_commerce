/// <reference path='../../typings/tsd.d.ts' />

import express = require('express');
import mongoose = require('mongoose');
var router = express.Router();


/**
* Mngoose Server Connection
* @param {String,}),Users = mongoose.model('Users', UserSchema);app.use(function(req, res, next) {	var err = new Error('Page Not Found'} 'mongodb [description]
*/
mongoose.connect('mongodb://localhost/helloExpress');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
	console.log('database connect Successfully');
});

var UserSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	email: String,
	password: String,
}),
Users = mongoose.model('Users', UserSchema);

// Param Precondiction for reuse name parameter
router.param('name', function(req, res, next, name) {
	Users.find({ firstname: name }, (err, docs) => {
		if (err) {
			var er = new Error('User Not Found');
			next(err);
		} else {
			req.user = docs[0];
			next();
		}
	});
});

router.get('/', (req, res) => {
	Users.find({}, (err, docs) => {
		res.render('user_index', { title: 'Users', users: docs });
	});
}).post('/', (req, res) => {
	//create 
	var somethingWrong = false;
	if(somethingWrong){
		var vm = {
			title: 'Create New User',
			input: req.body,
			error: 'something went Wrong Here'
		}
		delete vm.input.password;
		return res.render('signup', vm);
	}


	var b = req.body;
	new Users({
		firstname: b.firstname,
		lastname: b.lastname,
		email: b.email,
		password: b.password,
	}).save((err, docs) => {
		if (err) res.json(err);
		res.redirect('/users/' + docs.firstname);
	});

}).get('/:name', (req, res) => {
	//show
	res.render('user_show', { user: req.user });

}).get('/:name/edit', (req, res) => {
	//edit
	res.render('user_edit', { user: req.user });
}).put('/:name', (req, res) => {
	//update
	var b = req.body;
	Users.update(
	{
		firstname: req.params.firstname
	},
	{
		firstname: b.firstname,
		lastname: b.lastname,
		email: b.email
	},
	(err, user) => {
		res.send(b.firstname);
	});

}).delete('/:name', (req, res) => {
	//destroy
	Users.remove({ firstname: req.params.name }, () => {
		res.redirect('/users');
	});
});


export  = router;