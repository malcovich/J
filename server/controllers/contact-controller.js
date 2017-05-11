var mongoose = require('mongoose');
var Contact = require('../datasets/contact');
module.exports.add = function(req, res){
	var contact = new Contact(req.body);
	contact.save();
	res.json(req.body);
}

module.exports.list = function(req, res){
	Contact.find({ userId : req.param('userId')}, function (err, result) {
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
