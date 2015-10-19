/// <reference path='../../typings/tsd.d.ts' />
var express = require('express');
var router = express.Router();
var vm = {
    title: 'Sidebar Right'
};
router.get('/', function (req, res) {
    res.render('sidebar-right', vm);
});
module.exports = router;
