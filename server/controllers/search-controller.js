var mongoose = require('mongoose');
var Contact = require('../datasets/contact');
var User = require('../datasets/users');

module.exports.search = function(req, res){
	var regex = new RegExp('req.body.q', 'i');  // 'i' makes it case insensitive
    
	User.find({ $text: { $search: req.body.q }}, function (err, result) {
		console.log(result)
		res.json(result);
     //    var friendsIds = result.map(function(i){ return i._id})
     //   	Contact.find({$or:[{ userId :  {$in: friendsIds}}, {userId :  req.param('userId')}]}, function (err, result) {
     //   		var reslt = {}
     //   		result.forEach(function(item){
     //   			if(!reslt[item.userId]){
     //   				reslt[item.userId] = [];
     //   			}
     //   			reslt[item.userId].push(item);
     //   		})
	    //     res.json(reslt);
	    // });
    });
}
