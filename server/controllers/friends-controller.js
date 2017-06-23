var mongoose = require('mongoose');
var Friend = require('../datasets/friend');
var Contact = require('../datasets/contact');
var User = require('../datasets/users');

module.exports.add = function(req, res){
	var friend = new Friend(req.body);
	friend.save();
	res.json(req.body);
}

module.exports.list = function(req,res) {
	Friend.find({$and: [ {$or: [ {useridinvite : req.param('userId')} , {useridaccept : req.param('userId')} ]} , { accepted: true }]}).populate('useridinvite').populate('useridaccept').exec(function (err, result) { 
		console.log(result)
    	res.json(result);
	});
}

/*module.exports.list = function(req, res){
	Friend.find({ friendId1 : req.param('userId')}, function (err, result) {
		console.log(result)
       res.json(result);
    });
}
*/
module.exports.item = function(req, res) {

	User.find({_id: req.body.friendId}).exec(function (err, result) {
		Contact.find({ userId: result[0]._id}).exec(function (err, contacts) {
			console.log(result)
        	res.json({'friend': result, 'contacts': contacts });
		});
	});
}

/*module.exports.item = function(req, res){
	Friend.find({ _id : req.param('id')}).populate('_idmy').populate('_idfriend').exec(function (err, result) {
		Contact.find({ userId: result[0].friendId1}).exec(function (err, contacts) {
			console.log(result)
        	res.json({'friend': result, 'contacts':contacts });
		});

				Contact.find({ $or:[ {userId: result[0].useridinvite} , {userId: result[0].useridaccept} ]}).exec(function (err, contacts) {
			console.log(result)
        	res.json({'friend': result, 'contacts':contacts });
		});

.populate('useridinvite').populate('useridaccept').exec(function(err, result)


    });
}*/

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
