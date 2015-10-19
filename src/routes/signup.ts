/// <reference path='../../typings/tsd.d.ts' />

import express = require('express');
var router = express.Router();

var vm = {
	title: 'Sign Up'
};


router.get('/', (req, res) => {
	res.render('signup', vm);
});

export  = router;