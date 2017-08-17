var mongoose = require('mongoose');
var Event = require('../datasets/event');

module.exports.add = function(req, res){
	var event = new Event(req.body);
	event.save();
	res.json(req.body)
}

module.exports.getList = function(req, res){
	Event.find({contactId: req.param("contactId")}).populate("userId").exec(function(err,list){
		res.json(list);
	})
}