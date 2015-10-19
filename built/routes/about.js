/// <reference path='../../typings/tsd.d.ts' />
var express = require('express');
var router = express.Router();
var vm = {
    title: 'About'
};
router.get('/', function (req, res) {
    res.render('about', vm);
});
module.exports = router;
