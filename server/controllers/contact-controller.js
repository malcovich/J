var mongoose = require('mongoose');
var Contact = require('../datasets/contact');
var Friend = require('../datasets/friend');
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

module.exports.all = function(req, res){
	Friend.find({ userId : req.param('userId')}, function (err, result) {
        var friendsIds = result.map(function(i){ return i._id})
       	Contact.find({$or:[{ userId :  {$in: friendsIds}}, {userId :  req.param('userId')}]}, function (err, result) {
       		var reslt = {}
       		result.forEach(function(item){
       			if(!reslt[item.userId]){
       				reslt[item.userId] = [];
       			}
       			reslt[item.userId].push(item);
       		})
       		console.log('1',result, reslt)
	        res.json(reslt);
	    });
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
