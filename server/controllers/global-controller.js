var mongoose = require('mongoose');
var Global = require('../datasets/global');
module.exports.add = function(req, res){
	var global = new Global(req.body);
	console.log(global)
	global.save();
	res.json(req.body);
}

module.exports.list = function(req, res){
	Global.find({ userId : req.param('user_id')}, function (err, result) {
       res.json(result);
    });
}
module.exports.item = function(req, res){
	Global.find({ _id : req.param('id')}, function (err, result) {
       res.json(result);
    });
}