/// <reference path='../../typings/tsd.d.ts' />
var express = require('express');
var router = express.Router();
var vm = {
    title: 'Sign Up'
};
router.get('/', function (req, res) {
    res.render('signup', vm);
});
module.exports = router;
