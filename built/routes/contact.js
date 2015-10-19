/// <reference path='../../typings/tsd.d.ts' />
var express = require('express');
var router = express.Router();
var vm = {
    title: 'Contact'
};
router.get('/', function (req, res) {
    res.render('contact', vm);
});
module.exports = router;
