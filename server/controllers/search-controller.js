var mongoose = require('mongoose');
var Contact = require('../datasets/contact');
var User = require('../datasets/users');

module.exports.search = function(req, res){
  var q = req.body.q;
  console.log(q)
	User.find({$text: { $search: q }}, function (err, result) {
		console.log('sdfsdf',result)
          var search = {};
          search.users = result;
       	Contact.find({ $text: { $search: q }}, function (err, contacts) {
               search.contacts = contacts;
	          res.json(search);
	    });
    });
}
