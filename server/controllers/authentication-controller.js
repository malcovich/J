var mongoose = require('mongoose');
var User = require('../datasets/users');
var Contact = require('../datasets/contact');
module.exports.signup = function(req, res){
	if(req.body.role == "customer"){
		var user = new User(req.body);
		user.save();
	}else {

	}
	
	res.json(req.body);
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

module.exports.updateProfile = function(req, res){
	User.findByIdAndUpdate(req.body._id , {'name': req.body.name}, {new: true},function(err, u) {
		console.log('u',u)
	  	if (err) {throw err;}else {res.json(u)}
	});
}
