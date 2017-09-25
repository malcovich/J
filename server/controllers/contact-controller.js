var mongoose = require('mongoose');
var Contact = require('../datasets/contact');
var Friend = require('../datasets/friend');
var Comment = require('../datasets/comment');
var Raiting = require('../datasets/raiting');

module.exports.add = function(req, res){
	var contact = new Contact(req.body);
	contact.save();
	res.json(contact);
}
module.exports.addExist = function(req, res){
	Contact.findByIdAndUpdate(req.body.id , { $push: { 'userId': req.body.userId }}, {new: true},function(err, u) {
		res.json(u)
	});
}
module.exports.deleteExist = function(req, res){
	Contact.findByIdAndUpdate(req.body.id , { $pull: { 'userId': req.body.userId }}, {new: true},function(err, u) {
		res.json(u)
	});
}

module.exports.updateInfo = function(req, res){
	var obj = {};
	obj[req.body.fild] =  req.body.answer;
	Contact.findByIdAndUpdate(req.body.contactId,obj, {new: true},function(err, u) {
		res.json(u)
	});
}

module.exports.updateInfoByContact = function(req, res){
	Contact.findByIdAndUpdate(req.body.id ,req.body.obj, {new: true},function(err, u) {
		res.json(u)
	});
}

module.exports.changeHiddenStatus = function(req, res){
	if (req.body.hidden == false){
		Contact.findByIdAndUpdate(req.body.id ,  { $push: { hidden: req.body.userId } } , {new: true},function(err, u) {
			res.json(u)
		});
	}else {
		Contact.findByIdAndUpdate(req.body.id ,  { $pull: { hidden: req.body.userId } } , {new: true},function(err, u) {
			res.json(u)
		});
	}
	
}

module.exports.changeRaiting = function(req, res){
	Contact.findByIdAndUpdate(req.body.id , { raiting : req.body.raiting}, {new: true},function(err, u) {
		res.json(u)
	});
}

module.exports.list = function(req, res){
	Contact.find({ userId : req.param('userId')}, function (err, result) {
       res.json(result);
    });
}
module.exports.getAlloverList = function(req, res){
	Contact.find({$and :[ {userId : req.param('userId')}, {userId: req.param('friendId')}]}, function (err, result) {
       res.json(result);
    });
}

module.exports.getItem = function(req, res){
	var userId = req.body.userId;
	Contact.find({_id : req.body._id}).exec(function (err, result) {
		res.json(result[0]);
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

module.exports.updateRaiting = function(req, res){
	var b = req.body;
	Raiting.findOneAndUpdate({$and: [{userId : b.userId}, {contactId: b.contactId}]}, {'raiting': b.raiting}, {new : true})
		.exec(function(err,raitingUp){
			console.log('werwrwer',raitingUp)
			res.json(raitingUp)
	})
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

