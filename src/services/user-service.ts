import {IUserModel, User} from '../models/User';
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync();

export let addUser =  function(user, next) {
	bcrypt.hash(user.password, salt, function(err, hash) {
		
		(err) => next(err);

		var newUser = new User({
			firstname: user.firstname,
			lastname: user.lastname,
			username: user.username,
			email: user.email.toLowerCase(),
			password: hash,
		});

		newUser.save(function(err) {
			if(err) 
			 return next(err);
			next(null);
		});

	});
};

export let findUser = function(email, next) {
	//findOne is also available in mongo shell and native driver
	User.findOne({email: email.toLowerCase()}, function(err, user){
		//passing both err and user to next callback
		next(err, user);
	})
};

