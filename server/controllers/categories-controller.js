var mongoose = require('mongoose');
var Contact = require('../datasets/contact');
var Category = require('../datasets/category');

module.exports.add = function(req, res){
	var contact = new Contact(req.body);
	contact.save();
	res.json(req.body);
}

module.exports.list = function(req, res){
	Category.find({}, function (err, result) {
       res.json(result);
    });
}

module.exports.item = function(req, res){
	var userId = req.body.userId;
	var categoryId = req.body.id;
	Category.find({_id : categoryId}).exec(function (err, category) {
		Contact.find({$and :[{category: categoryId},{userId : userId}]}).exec(function(err, contacts){
			res.json({"contacts" : contacts,"category": category[0]});
		})
    });
}

