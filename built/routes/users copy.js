/// <reference path='../../typings/tsd.d.ts' />
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
/**
* Mngoose Server Connection
* @param {String,}),Users = mongoose.model('Users', UserSchema);app.use(function(req, res, next) {	var err = new Error('Page Not Found'} 'mongodb [description]
*/
mongoose.connect('mongodb://localhost/helloExpress');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('database connect Successfully');
});
var UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
}), Users = mongoose.model('Users', UserSchema);
// Param Precondiction for reuse name parameter
router.param('name', function (req, res, next, name) {
    Users.find({ firstname: name }, function (err, docs) {
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
router.get('/', function (req, res) {
    Users.find({}, function (err, docs) {
        res.render('user_index', { title: 'Users', users: docs });
    });
}).post('/', function (req, res) {
    //create 
    var somethingWrong = false;
    if (somethingWrong) {
        var vm = {
            title: 'Create New User',
            input: req.body,
            error: 'something went Wrong Here'
        };
        delete vm.input.password;
        return res.render('signup', vm);
    }
    var b = req.body;
    new Users({
        firstname: b.firstname,
        lastname: b.lastname,
        email: b.email,
        password: b.password
    }).save(function (err, docs) {
        if (err)
            res.json(err);
        res.redirect('/users/' + docs.firstname);
    });
}).get('/:name', function (req, res) {
    //show
    res.render('user_show', { user: req.user });
}).get('/:name/edit', function (req, res) {
    //edit
    res.render('user_edit', { user: req.user });
}).put('/:name', function (req, res) {
    //update
    var b = req.body;
    Users.update({
        firstname: req.params.firstname
    }, {
        firstname: b.firstname,
        lastname: b.lastname,
        email: b.email
    }, function (err, user) {
        res.send(b.firstname);
    });
}).delete('/:name', function (req, res) {
    //destroy
    Users.remove({ firstname: req.params.name }, function () {
        res.redirect('/users');
    });
});
module.exports = router;
