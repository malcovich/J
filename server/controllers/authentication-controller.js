var mongoose = require('mongoose');
var User = require('../datasets/users');
var Contact = require('../datasets/contact');
var jwt = require("jsonwebtoken");
var fs = require('fs');
var path = require('path');
var mv = require('mv');
var Jimp = require("jimp");

process.env.JWT_SECRET = "olololo"
module.exports.signup = function(req, res){
	/*var user = new User(req.body);
	user.save();
	res.json(req.body);*/

    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
                var userModel = new User();
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.role = req.body.role;
                userModel.name = req.body.name;
                userModel.save(function(err, user) {
                    user.token = jwt.sign(user, process.env.JWT_SECRET);
                    user.save(function(err, user1) {
                        res.json({
                            type: true,
                            data: user1,
                            token: user1.token
                        });
                    });
                })
            }
        }
    });
}

module.exports.signupContact = function(req, res){
	var contact = new Contact(req.body);
	contact.save();
	res.json(req.body);
}

module.exports.login = function(req,res){
	/*User.find(req.body,function(err,results){
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
	})*/

    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
               res.json({
                    type: true,
                    data: user,
                    token: user.token
                }); 
            } else {
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });    
            }
        }
    });
}

module.exports.updateProfile = function(req, res){
    User.findByIdAndUpdate(req.body._id , req.body, {new: true},function(err, u) {
        if (err) {throw err;}else {res.json(u)}
    });
}
module.exports.findByContactsList = function(req, res){
    var contacts = req.body;
    var phones = [];
    var names = [];
    var emails = [];

    contacts.forEach(function(contact){
        if (contact.phones != null) {
            contact.phones.forEach(function(i){
                phones.push(i);
            })
        }
        if(contact.emails != null){
            emails.push(contact.emails)
        }
        names.push(contact.displayName)
    })

    

    var users = [];
	User.find({$or : [{'name': {$in: names}}]},function(err, byName) {
        console.log('byName', byName)
        console.log('---------------------------')
        if (emails.length > 0){
                User.find({$or : [{'email': {$in: emails}}]},function(err, byEmail) {
                console.log('byEmail', byEmail)
                console.log('---------------------------')
                User.find({$or : [{'phone': {$in: phones}}]},function(err, byPhone) {
                    console.log('byPhone', byPhone)
                    console.log('---------------------------')
                    var users = [].concat(byName,byEmail, byPhone)
                    // var obj = {};

                    // for ( var i=0, len = users.length; i < len; i++ )
                    //     obj[users[i]['_id']] = users[i];

                    // users = new Array();
                    // for ( var key in obj )
                    //     users.push(obj[key]);
                });
            });
        }else {
             User.find({'phone': {$in: phones}},function(err, byPhone) {
                console.log('byPhone', byPhone)
                console.log('---------------------------')
                var users = [].concat(byName, byPhone)
                var obj = {};
                for ( var i=0, len = users.length; i < len; i++ )
                    obj[users[i]['_id']] = users[i];

                users = new Array();
                for ( var key in obj )
                    users.push(obj[key]);
                res.json(users)
            });
        }
	  
	});
}

module.exports.uploadBounds = function(req, res){
    var bounds = req.body.bounds;
    var w = req.body.bounds.right - req.body.bounds.left;
    var h = req.body.bounds.top - req.body.bounds.bottom;
    var x = +req.body.bounds.left;
    var y = +req.body.bounds.top;
 
   /* mv(req.body.imgPath, req.body.imgPath, function(err) {
        console.log(err)
         Jimp.read(req.body.imgPath, function (err, lenna) {
            if (err) throw err;
            var a = lenna.crop(x, y,w,h)  
                .write(newPas); // save
        });
    })*/
    Jimp.read(req.body.imgPath).then(function (image) {
            image.crop(10, 10,240,240)  
                .write('/public/uploads/crop/' + req.body.imgName); // save
    }).catch(function(err){
        console.log('!',err)
    })


    
    // Jimp.read(req.body.imgPath, function (err, lenna) {
    //     if (err) throw err;
    //     var a = lenna.crop(x, y,w,h)  
    //         .write(newPas); // save
    // });
    User.findByIdAndUpdate(req.body.id , {'bounds' : bounds}, {new: true},function(err, u) {
        res.json(u);        
    });
}

module.exports.addPhoto = function(req, res){
    var file = req.files.file;
    var RES = res;
    User.findByIdAndUpdate(req.body.id , {'img': file.path , imgName : file.name}, {new: true},function(err, u) {
        if (err) {throw err;}else {RES.json(u)}
    });
    // Jimp.read(file.path).then(function (lenna) {
    //     lenna.crop(x, y,w,h)            // resize
    //         .write(newPath); // save

        
    // });
}

