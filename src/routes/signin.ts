/// <reference path='../../typings/tsd.d.ts' />

import express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
	var vm = {
		title: 'Sign In',
		error: req.flash('error')
	};

	res.render('signin', vm);
});

export  = router;