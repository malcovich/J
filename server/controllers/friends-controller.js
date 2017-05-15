var mongoose = require('mongoose');
var Friend = require('../datasets/friend');
module.exports.add = function(req, res){
	var friend = new Friend(req.body);
	friend.save();
	res.json(req.body);
}

module.exports.list = function(req, res){
	Friend.find({ userId : req.param('userId')}, function (err, result) {
		console.log(result)
       res.json(result);
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
