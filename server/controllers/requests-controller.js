var mongoose = require('mongoose');
var Request = require('../datasets/request');
var Friend = require('../datasets/friend');
var Answer = require('../datasets/answer');
var Constact = require('../datasets/contact');
module.exports.add = function(req, res){
	var request = new Request(req.body);
	request.deleted = false;
	request.save();
	res.json(req.body);
}

module.exports.list = function(req, res){
	console.log(req.param('userId'))
	Request.find({$and : [{userId : req.param('userId')}, {deleted: false}]}, function (err, result) {
		console.log(result)
       res.json(result);
    });
}

module.exports.getItem = function(req, res){
	Request.find({_id : req.param('reqId')}).exec(function (err, result) {
       res.json(result);
    });
}

module.exports.listFriendsRequests = function(req, res){
	Friend.find({ userId : req.param('userId')}, function (err, result) {
		var ids = result.map(function(item){return item.friendId});
		Request.find({$and :[{ userId :  {$in: ids}}, {'deleted': false}]}, function (err, result) {
	       res.json(result);
	    });

	})
}

module.exports.deleteRequest = function(req, res){
	Request.findByIdAndUpdate(req.body.requestId , { 'deleted': true }, {new :true}, function(err, request) {
		res.json(request)
	  if (err) throw err;
	});
}

module.exports.login = function(req,res){
	User.find(req.body,function(err,results){
		if (err){
			console.log(err);
		}; 
		if (results && results.length === 1) {
			res.json(results[0])
		}
	})
}
module.exports.saveAnswer = function(req, res){
	var answer = new Answer(req.body);
	answer.save();
	res.json(req.body);
}

module.exports.getAnswer = function(req, res){
	Answer.find({ $and: [ {userId : req.param('userId')}, {requestId: req.param('reqId')}]}).populate('contacts')
		.exec(function(err, result) {
			console.log(result)
		    res.json(result);
		}); 
}
module.exports.getAllAnswers = function(req, res){
	Answer.find({requestId: req.param('reqId')}).populate('contacts').populate('userId')
		.exec(function(err, result) {
		    res.json(result);
		}); 
}
