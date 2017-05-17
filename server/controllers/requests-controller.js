var mongoose = require('mongoose');
var Request = require('../datasets/request');
var Friend = require('../datasets/friend');
module.exports.add = function(req, res){
	var request = new Request(req.body);
	request.deleted = false;
	request.save();
	res.json(req.body);
}

module.exports.list = function(req, res){
	Request.find({ $and: [ {userId : req.param('userId')}, {deleted: false}]}, function (err, result) {
       res.json(result);
    });
}

module.exports.listFriendsRequests = function(req, res){
	Friend.find({ userId : req.param('userId')}, function (err, result) {
		var ids = result.map(function(item){return item._id});
		Request.find({ userId :  {$in: ids}}, function (err, result) {
			console.log('RE',result)
	       res.json(result);
	    });

	})
}

module.exports.deleteRequest = function(req, res){
	Request.findByIdAndUpdate(req.body.requestId , { deleted: true }, function(err, user) {
	  if (err) throw err;
	  console.log(user);
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
