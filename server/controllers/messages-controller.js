var mongoose = require('mongoose');
var Contact = require('../datasets/contact');
var Friend = require('../datasets/friend');
var Message = require('../datasets/message');

module.exports.addMessage = function(req, res){
	var options = { upsert: true, new: true, setDefaultsOnInsert: true },
	query = {'userId': req.body.userId ,'contactId': req.body.contactId};
	// Find the document
	Message.findOneAndUpdate(query, { $push: { 'list': req.body.message }}, options, function(error, result) {
	    if (error) return;
	    	res.json(result)
	    // do something with the document
	});
}

module.exports.list = function(req, res){
	Message.find({'userId': req.body.id}).populate('contactId').populate('userId').exec(function(error, result) {
	    	res.json(result)
	    // do something with the document
	});
}

module.exports.item = function(req, res){
	Message.find({'_id': req.body.id}).populate('contactId').populate('userId').exec(function(error, result) {
	    	res.json(result[0])
	    // do something with the document
	});
}