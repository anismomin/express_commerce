/// <reference path='./../../typings/tsd.d.ts' />
var express = require('express');
var router = express.Router();
var vm = {
    title: 'Home'
};
router.get('/', function (req, res) {
    res.render('index', vm);
});
module.exports = router;
