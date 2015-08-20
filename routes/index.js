var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('*', function(req, res){
	//res.sendfile('../public/index.html');
	res.sendfile(path.resolve('public/index.html'));
});

module.exports = router;
