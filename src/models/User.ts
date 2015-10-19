//import mongoose = require("mongoose");
import mongoose from '../db';

import IUser from 'IUser';
import userService = require('../services/user-service');
export interface IUserModel extends IUser, mongoose.Document { }

var userSchema = new mongoose.Schema({
	firstname: { type:String, required: 'Please Enter First Name' },
	lastname: { type:String, required: 'Please Enter Last Name' },
	username: { type: String, required: 'Please Enter Username' },
	email: { type:String, required: 'Please Enter Valid Email' },
	password: { type:String, required: 'Password is Required' },
	created: {type : Date, default: Date.now()}
});


//calling path method of user schema
userSchema.path('email').validate(function(value, next) {
	userService.findUser(value, function(err, user) {
		if (err) {
			console.log(err);
			return next(false); // with false value to callback.it say valdation fail
		}
		next(!user) // otherwise we return oposite of truhtiness value of user. if user exist return false  
	});
}, 'That email is already in use');
export let User = mongoose.model<IUserModel>("User", userSchema);


