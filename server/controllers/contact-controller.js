var mongoose = require('mongoose');
var Contact = require('../datasets/contact');
var Friend = require('../datasets/friend');
var Comment = require('../datasets/comment');
var Raiting = require('../datasets/raiting');
module.exports.add = function(req, res){
	var contact = new Contact(req.body);
	contact.save();
	res.json(req.body);
}
module.exports.addExist = function(req, res){
	Contact.findByIdAndUpdate(req.body.id , { $push: { 'userId': req.body.userId }}, {new: true},function(err, u) {
		res.json(u)
	});
}
module.exports.deleteExist = function(req, res){
	console.log(req)
	Contact.findByIdAndUpdate(req.body.id , { $pull: { 'userId': req.body.userId }}, {new: true},function(err, u) {
		res.json(u)
	});
}

module.exports.changeHiddenStatus = function(req, res){
	Contact.findByIdAndUpdate(req.body.id , { hidden : req.body.hidden}, {new: true},function(err, u) {
		res.json(u)
	});
}


module.exports.list = function(req, res){
	Contact.find({ userId : req.param('userId')}, function (err, result) {
       res.json(result);
    });
}

module.exports.getItem = function(req, res){
	var userId = req.body.userId;
	Contact.find({_id : req.param('_id')}).populate('verifyContact').exec(function (err, result) {
		var contact = result[0]
		if (result[0].userId.indexOf(userId) != -1) {
			if (result[0].phone){
				var phone = result[0].phone.replace(/ /g,'');  
				Contact.find({'phone' : phone}, function(err,result){
					res.json({'contact' : contact, 'hypothesis' : result})
				})
			}
		}else {
			res.json(result);
		}
    });
}
module.exports.getFullItem = function(req, res){
	var userId = req.body.userId;
	Contact.find({_id : req.param('_id')}).populate('userId').exec(function (err, result) {
			res.json(result);
    });
}

module.exports.verifyContact = function(req, res) {
	Contact.findByIdAndUpdate(req.body.id , {'verifyContact': req.body.verifyId}, {new: true},function(err, u) {
		var  cont = u;
		Contact.findByIdAndUpdate(req.body.verifyId , { $push: { 'userId': req.body.userId }}, {new: true},function(err, u) {
		  	if (err) {throw err;}else {res.json(cont)}
		});
	});
}

module.exports.addComment = function(req, res){
	var comment = new Comment(req.body);
	comment.save();
	res.json(req.body);
}
module.exports.commentsList = function(req, res){
	Comment.find({ "contactId" : req.param('id')}).populate('userId').exec(function (err, result) {
       res.json(result);
    });
}
module.exports.raitingList = function(req, res){
	Raiting.find({ "contactId" : req.param('id')}).populate('userId').exec(function (err, result) {
       res.json(result);
    });
}
module.exports.addRaiting = function(req, res){
	var raiting = new Raiting(req.body);
	raiting.save();
	res.json(req.body);
}

module.exports.all = function(req, res){
	Friend.find({$and: [ {$or: [ {useridinvite : req.param('userId')} , {useridaccept : req.param('userId')} ]} , { accepted: true }]}).populate('useridaccept').populate('useridinvite').exec(function (err, result) {
        for (var i = 0; i < result.length; i++) {
	        if (result[i].useridaccept._id ==  req.param('userId')) {
	          result.splice(i, 1, result[i].useridinvite);
	        } else {
	          result.splice(i, 1, result[i].useridaccept);
	        }
      	}
      	var friendsObj = result;
        var friendsIds = result.map(function(i){ return i._id})
        friendsIds.push(req.param('userId'))
       	Contact.find({ userId : {$in: friendsIds}}).populate('userId').exec(function (err, result) {
	        res.json(result);
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
