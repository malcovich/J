var mongoose = require('mongoose');
var Request = require('../datasets/request');
var Friend = require('../datasets/friend');
var Answer = require('../datasets/answer');
var User = require('../datasets/users');
var Constact = require('../datasets/contact');

module.exports.add = function(req, res){
	var request = new Request(req.body);
	request.deleted = false;
	request.save(function(err,result){
		User.find({_id :request.userId}).exec(function(err,user){
			result.userId = user;
			res.json({request: request, user :user});
		})
	});
}

module.exports.list = function(req, res){
	Request.find({$and :[{userId : req.param('userId')}, {deleted: false}]}).populate("userId").exec(function (err, result) {
       res.json(result);
    });
}

module.exports.getItem = function(req, res){
	Request.find({_id : req.param('reqId')}).populate('userId').exec(function (err, request) {
       res.json(request);
    });
}

module.exports.listFriendsRequests = function(req, res){
	//need add new params DELETED: FALSE
	Friend.find({$and: [ {$or: [ {useridinvite : req.param('userId')} , {useridaccept : req.param('userId')} ]} , { accepted: true }]}).populate('useridaccept').populate('useridinvite').exec(function (err, result) {
		for (var i = 0; i < result.length; i++) {
	        if (result[i].useridaccept._id ==  req.param('userId')) {
	          result.splice(i, 1, result[i].useridinvite);
	        } else {
	          result.splice(i, 1, result[i].useridaccept);
	        }
      	}
		var ids = result;
		Request.find({$and :[{ userId :  {$in: ids}}, {'deleted': false}]}).populate('userId').exec(function (err, requests) {
	       res.json(requests);
	    });

	})
}

module.exports.listFriendsRequestsNew = function(req, res){
	//need add new params DELETED: FALSE
	Friend.find({$and: [ {$or: [ {useridinvite : req.param('userId')} , {useridaccept : req.param('userId')}]} , { accepted: true }]}).populate('useridaccept').populate('useridinvite').exec(function (err, result) {
		for (var i = 0; i < result.length; i++) {
	        if (result[i].useridaccept._id ==  req.param('userId')) {
	          result.splice(i, 1, result[i].useridinvite);
	        } else {
	          result.splice(i, 1, result[i].useridaccept);
	        }
      	}
		var ids = result;
		Request.find({$and :[{ userId :  {$in: ids}}, {'deleted': false}, {'viewed': {'$ne': req.param('userId') }}]}).populate('userId').exec(function (err, requests) {
	       res.json(requests);
	    });

	})
}

module.exports.deleteRequest = function(req, res){
	Request.findByIdAndUpdate(req.body.requestId , { 'deleted': true }, {new :true}, function(err, request) {
		res.json(request)
	  if (err) throw err;
	});
}
module.exports.changeRequest = function(req, res){
	Request.findByIdAndUpdate(req.body.requestId , { 'text': req.body.newText }, {new :true}).populate('userId').exec(function(err, request) {
		res.json(request)
	  if (err) throw err;
	});
}

module.exports.saveAnswer = function(req, res){
	var requestId = req.param('requestId')
	Answer.find({ $and: [ {userId : req.param('userId')}, {requestId: requestId}]}).exec(function(err, answer){
		if (answer.length > 0){
			answer[0].contacts = req.param('contacts')
			answer[0].save(function(err,ans){
				res.json({data:ans});
			});
		}
		else{ 
			var newAnswer = new Answer(req.body);
			newAnswer.save(function(err, ans){
				res.json({data:ans});
			});
			
		}
	})

}

module.exports.getAnswer = function(req, res){
	Answer.find({ $and: [ {userId : req.param('userId')}, {requestId: req.param('reqId')}]}).populate('contacts')
		.exec(function(err, result) {
		    res.json(result);
		}); 
}
module.exports.getAllAnswers = function(req, res){
	Answer.find({requestId: req.param('reqId')}).populate('contacts').populate('userId')
		.exec(function(err, result) {
		    res.json(result);
		}); 
}

module.exports.list = function(req, res){
	Request.find({$and :[{userId : req.param('userId')}, {deleted: false}]}).populate("userId").exec(function (err, result) {
       res.json(result);
    });
}
module.exports.getAllAnswersNew = function(req, res){
	Request.find({$and :[{userId : req.param('userId')}, {deleted: false}]}).exec(function (err, result) {
		var reqId = result.map(function(item){
			return item._id;
		});
		console.log(reqId)
		Answer.find({$and :[{'requestId': {$in :reqId}},{'viewed': {'$ne': req.param('userId')}}]}).populate('contacts').populate('userId')
			.exec(function(err, result) {
			    res.json(result);
		}); 
	});
}