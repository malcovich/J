var mongoose = require('mongoose');
var User = require('../datasets/users');
var Contact = require('../datasets/contact');

var fs = require('fs');
var path = require('path');
var mv = require('mv');

module.exports.signup = function(req, res){
	var user = new User(req.body);
	user.save();
	res.json(req.body);
}

module.exports.signupContact = function(req, res){
	var contact = new Contact(req.body);
	contact.save();
	res.json(req.body);
}

module.exports.login = function(req,res){
	User.find(req.body,function(err,results){
		console.log('results', results)
		if (err){
			console.log('wew')
		}; 
		if (results && results.length === 1) {
			res.json({user:results[0], type: "Customer"})
		}else {
			Contact.find(req.body,function(err,results){
				if (results && results.length === 1) {
					res.json({user:results[0], type: "Worker"})
				}
			})
		}
	})
}

module.exports.updateProfile = function(req, res){
	User.findByIdAndUpdate(req.body._id , {'name': req.body.name}, {new: true},function(err, u) {
		console.log('u',u)
	  	if (err) {throw err;}else {res.json(u)}
	});
}

module.exports.addPhoto = function(req, res){
    console.log(req.body.id)
    var file = req.files.file;
    var tempPath = file.path;
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    var newName =  guid() + file.name;
    var target_path = 'public/uploads/' + newName;

    
    // move the file from the temporary location to the intended location
    fs.rename(tempPath, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tempPath, function() {
            if (err) throw err;
            User.findByIdAndUpdate(req.body.id , {'img': target_path}, {new: true},function(err, u) {
                if (err) {throw err;}else {res.json(u)}
            });
        });
    });
}

