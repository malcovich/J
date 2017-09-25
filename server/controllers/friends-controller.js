var mongoose = require('mongoose');
var Friend = require('../datasets/friend');
var Contact = require('../datasets/contact');
var User = require('../datasets/users');

module.exports.add = function(req, res){
	var friend = new Friend(req.body);
	Friend.find({$and: [ {$or: [ {useridinvite : friend.useridinvite} , {useridaccept : friend.useridinvite} ]} , {$or: [ {useridinvite : friend.useridaccept} , {useridaccept : friend.useridaccept} ]},{ deleted: false }]}).exec(function (err, result) { 
    	
    	if (result.length === 0) {
			friend.save();
			res.json(friend);
    	} else {
    		if (result.accepted === true) {
	    		result.sendreq == false;
	    		res.json(result[0]);
	    	} else {
	    		res.json(result[0]);
	    	}
    	}
	});
}

module.exports.list = function(req,res) {
	Friend.find({$and: [ {$or: [ {useridinvite : req.param('userId')} , {useridaccept : req.param('userId')} ]} , { accepted: true } , { deleted: false }]}).populate('useridinvite').populate('useridaccept').exec(function (err, result) { 
    	res.json(result);
	});
}

module.exports.listFriendsRequests = function(req,res) {
	Friend.find({$and: [{useridaccept : req.param('userId')} , { accepted: false }, { deleted: false }]}).populate('useridinvite').populate('useridaccept').exec(function (err, result) { 
    	res.json(result);
	});
}

module.exports.listSendedRequests = function(req,res) {
	Friend.find({$and: [{useridinvite : req.param('userId')} , { accepted: false }, { deleted: false }]}).populate('useridinvite').populate('useridaccept').exec(function (err, result) { 
    	res.json(result);
	});
}

module.exports.accept = function(req,res) {
	Friend.findByIdAndUpdate(req.body._id,{"$set": {"accepted": true, "sendreq": false }}).populate('useridinvite').populate('useridaccept').exec(function (err, result) { 
    	res.json(result);
	});
}

module.exports.item = function(req, res) {
	User.find({'_id' : req.body.friendId}).exec(function (err, result) {
		console.log(result[0])
		Contact.find({ userId: result[0]._id}).exec(function (err, contacts) {
			Friend.find({$and: [ {$or: [ {useridinvite : req.body.friendId} , {useridaccept : req.body.friendId} ]} , { accepted: true } , { deleted: false } ]}).populate('useridinvite').populate('useridaccept').exec(function (err, friends) { 
	    		res.json({'friend': result[0], 'contacts': contacts, 'friends': friends });
			});
		});
	});
}

module.exports.deleteFriend = function(req, res){
	Friend.findOneAndUpdate({$or: [ {$and:[{'useridinvite': req.body.friendId}, {'useridaccept': req.body.userId}]} , {$and:[{'useridinvite': req.body.userId}, {'useridaccept': req.body.friendId}]} ]}, {$set:{deleted: 'true'}}, {new: true},function(err, result) {
		res.json(result)
	  	if (err) throw err;
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
