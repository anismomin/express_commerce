/// <reference path='../../typings/tsd.d.ts' />
var express = require('express');
var router = express.Router();
var vm = {
    title: 'Sidebar Left'
};
router.get('/', function (req, res, next) {
    res.render('sidebar-left', vm);
});
module.exports = router;
