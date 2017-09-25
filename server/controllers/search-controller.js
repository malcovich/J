var mongoose = require('mongoose');
var Contact = require('../datasets/contact');
var User = require('../datasets/users');
var Friend = require('../datasets/friend');

module.exports.search = function(req, res){
	var query = {},
	search = {
		users: [],
		contacts: []
	},
	userId = req.body.userId;

  	query =  new RegExp(req.body.q, 'i');

	User.find({$or : [{email: query},{name : query}]}, function(error, users){
	    if(error) {
	    	return res.status(400).send({msg:"error occurred"});
	    }
	 
	    Friend.find({$and: [ {$or: [ {useridinvite : userId} , {useridaccept : userId} ]} , { accepted: true } , { deleted: false }]}).populate('useridinvite').populate('useridaccept').exec(function (err, result) { 
	      	var listFriends = filterFriendsList(result, userId);
	      	var copyUsers = JSON.parse(JSON.stringify(users));
			console.log(copyUsers)
			var promises = [];
			
			for( var user in users){
				promises.push(getFriendsListPromise(users[0]._id))
			};

			Promise.all(promises).then(function(data){ 
				data.forEach(function(usersList, index){
					copyUsers[index].listFriends = filterFriendsList(usersList, users[index]._id);
				});
				copyUsers.forEach(function(cUser, index1){
					search.users.push(findFriendsInFriendsUsers(listFriends,cUser))
				});
		 	
		    	Contact.find({$or : [{email: query},{name : query},{spec : query}]}, function (err, contacts) {
			    	contacts.forEach(function(contact){
			    		contact.userFriends = [];
			    		search.contacts.push(findFriendsInContactUsers(listFriends,contact ))
			    	});

			    	search.contacts.sort(function(a,b) {
			    		if (b.userFriends.length < a.userFriends.length) return -1;
					    if (b.userFriends.length > a.userFriends.length) return 1;
					    return 0;
			    	});

			    	res.json(search);
			    });

		    });
	    });
	});

	function getFriendsListPromise (userId){
		return Friend.find({$and: [ {$or: [ {useridinvite :userId} , {useridaccept : userId} ]} , { accepted: true } , { deleted: false }]});
	};

	function filterFriendsList (arr, id){
		var friendsList = [];
		
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].useridaccept._id == id) {
				friendsList.splice(i, 1, arr[i].useridinvite);
			} else {
				friendsList.splice(i, 1, arr[i].useridaccept);
			}
		};
		return friendsList;
	};

	function findFriendsInContactUsers (friends, contact){
		var a = JSON.parse(JSON.stringify(contact));
		a.userFriends = [];
		friends.forEach(function(friend){
			if(a.userId.indexOf((friend._id).toString()) >= 0){
				a.userFriends.push(friend);
			}
		});
		return a;
	}

	function findFriendsInFriendsUsers(userFriends, searchUser){
		var copySearchUser = JSON.parse(JSON.stringify(searchUser));
		copySearchUser.bothFriends = [];
		userFriends.forEach(function(friend){
			if(copySearchUser.listFriends.indexOf((friend._id).toString()) >= 0){
				copySearchUser.bothFriends.push(friend);
			}
		});
		return copySearchUser;
	}
}
