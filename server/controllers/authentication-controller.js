var mongoose = require('mongoose');
var User = require('../datasets/users');
var Contact = require('../datasets/contact');
module.exports.signup = function(req, res){
	var user = new User(req.body);
	user.save();
	res.json(req.body);
}

module.exports.signupContact = function(req, res){
	var contact = new Contact(req.body);
	contact.save();
	res.json(req.body);
}

module.exports.login = function(req,res){
	User.find(req.body,function(err,results){
		console.log('results', results)
		if (err){
			console.log('wew')
		}; 
		if (results && results.length === 1) {
			res.json({user:results[0], type: "Customer"})
		}else {
			Contact.find(req.body,function(err,results){
				if (results && results.length === 1) {
					res.json({user:results[0], type: "Worker"})
				}
			})
		}
	})
}

module.exports.updateProfile = function(req, res){
	User.findByIdAndUpdate(req.body._id , {'name': req.body.name}, {new: true},function(err, u) {
		console.log('u',u)
	  	if (err) {throw err;}else {res.json(u)}
	});
}
