var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Training = require('../models/training.js');
var adminUser= require('../models/admin-users.js');
var bcrypt = require('bcrypt-nodejs');

router.get('/', function(req, res){
	res.send('Welcome to the API zone!');
});

router.get('/trainings', function(req, res){
	return Training.find(function(err, trainings){
		if(!err){
			return res.send(trainings);
		}
		else{
			return res.send(500, err);
		}
	});
});

router.post('/trainings/add', sessionCheck, function(req, res){
	var training = new Training({
		title: req.body.title,
		description: req.body.description,
		speaker: req.body.speaker,
		date: req.body.date
	});
	
	training.save(function(err){
		if(!err){
			return res.send(200, training);
		}
		else{
			return res.send(500, err);
		}
	});
});

router.post('/trainings/update', sessionCheck, function(req, res){
	var id = req.body._id;
	
	Training.update({
		_id: id
	}, {
		$set: {
			title: req.body.title,
			description: req.body.description,
			speaker: req.body.speaker,
			date: req.body.date
		}
	}).exec();
	res.send("Training updated!");
});

router.get('/trainings/delete/:id', sessionCheck, function(req, res){
	var id = req.params.id;
	
	Training.remove({
		_id: id
	}, function(err){
		console.log(err);
	});
	return res.send("Training id- " + id + "has been deleted.");
});

router.get('/trainings/details/:id', sessionCheck, function(req, res){
	var id = req.params.id;
	
	Training.findOne({
		_id: id
	}, function(err, training){
		if(err){
			console.log(err);
		}
		return res.send(training);
	});
});

router.post('/add-user', function(req, res){
	var salt, hash, password;
	password = req.body.password;
	salt = bcrypt.genSaltSync(10);
	hash = bcrypt.hashSync(password, salt);
	
	var AdminUser = new adminUser({
		username: req.body.username,
		password: hash
	});
	
	AdminUser.save(function(err){
		if(!err){
			return res.send('Admin User successfuly created');
		}
		else{
			return res.send(err);
		}
		
	});
});

router.post('/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	
	adminUser.findOne({
		username: username
	}, function(err, data){
		if(err | data === null){
			return res.send(401, "User doesn't exist!");
		}
		else{
			var usr = data;
			
			if(username == usr.username && bcrypt.compareSync(password, usr.password)){
				req.session.regenerate(function(){
					req.session.user = username;
					return res.send(username);
				});
			}
			else{
				return res.send(401, "Bad Username or Password");
			}
		}
	});
	
});

router.get('/logout', function(req, res){
	req.session.destroy(function(){
		return res.send(401, "User logged out");
	});
});

function sessionCheck(req, res, next){
	if(req.session.user) next();
	else{
		res.send(401, "Authorization failed!");
	}
}

module.exports = router;