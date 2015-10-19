/// <reference path='../../typings/tsd.d.ts' />
var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
    var vm = {
        title: 'Sign In',
        error: req.flash('error')
    };
    res.render('signin', vm);
});
module.exports = router;
