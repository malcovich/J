var mongoose = require('mongoose');
var User = require('../datasets/users');
module.exports.signup = function(req, res){
	var user = new User(req.body);
	user.save();

	res.json(req.body);
}

module.exports.login = function(req,res){
	console.log('!!!1', req.body)
	User.find(req.body,function(err,results){
		if (err){
			console.log(err);
		}; 
		if (results && results.length === 1) {
			console.log(results[0])
			res.json(results[0])
		}
	})
}
