/// <reference path='../typings/tsd.d.ts' />
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/helloExpress');
/**
* Mngoose Server Connection
* @param {String,}),Users = mongoose.model('Users', UserSchema);app.use(function(req, res, next) {	var err = new Error('Page Not Found'} 'mongodb [description]
*/
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('database connect Successfully');
});
exports["default"] = mongoose;
