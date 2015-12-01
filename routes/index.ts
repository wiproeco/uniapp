/// <reference path='../src/tsd.d.ts' />

import express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Demo Node Capability' + 1+1});
});

export = router;
