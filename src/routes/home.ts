/// <reference path='./../../typings/tsd.d.ts' />

import express = require('express');
var router = express.Router();
var vm = {
	title: 'Home'
};

router.get('/', (req, res) => {
	
	res.render('index', vm);
});

export  = router;