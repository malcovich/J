angular.module('MyApp')
  .controller('FriendController', ['$scope', '$log', 'user', '$state','$uibModal', '$http',  '$stateParams', function($scope, $log, user, $state,$uibModal, $http, $stateParams){
  	var $ctrl = this;
        $ctrl.user = user.data;
		$http.post('/api/friend/item', {'friendId': $stateParams.id}).then(function(res){
	      	$ctrl.friendInfo = res.data;
	      	var userId =  $ctrl.user._id;
	      	var friendId = $ctrl.friendInfo.friend._id;
	      	var friends = [];
		    $ctrl.showHideAddContact();
		    $ctrl.listAlloverContact();

		    for (var i = 0; i < $ctrl.friendInfo.friends.length; i++) {
		        if ($ctrl.friendInfo.friends[i].useridaccept._id == friendId ) {
		          friends.splice(i, 1, $ctrl.friendInfo.friends[i].useridinvite);
		        } else {
		          friends.splice(i, 1, $ctrl.friendInfo.friends[i].useridaccept);
		        }
		    }
		    $ctrl.friendInfo.friends = friends;
	  

		    $http.post('/api/friend/list', {'userId': $ctrl.user._id}).then(function(res){
		      	$ctrl.friendsList = res.data;
		     	var userID = $ctrl.user._id;
		      	var friendsList = [];

			      for (var i = 0; i < $ctrl.friendsList.length; i++) {
			        if ($ctrl.friendsList[i].useridaccept._id == userID) {
			          friendsList.splice(i, 1, $ctrl.friendsList[i].useridinvite);
			        } else {
			          friendsList.splice(i, 1, $ctrl.friendsList[i].useridaccept);
			        }
			      }
			      $ctrl.friendsList = friendsList.map(function(friend){
			      	return friend._id;
			      });
			    $http.post('/api/friend/listFriendsRequests',{userId: $ctrl.user._id}).then(function(res,err){
				   $ctrl.listRequest = res.data;
				   $http.post('/api/friend/listSendedRequests',{userId: $ctrl.user._id}).then(function(res,err){
				   		$ctrl.listRequest =[].concat(res.data,$ctrl.listRequest);
		      			$ctrl.showHideAddFriend();

				   })
				})

			});

	    	
  		});
    	$ctrl.deleteFriend = function(id){
    		var params = {'friendId': id, 'userId': $ctrl.user._id}

    		$http.post('/api/friend/deleteFriend', params).then(function(res){
    			$ctrl.friendData = res.data;

    			if ($ctrl.friendData.deleted == true) {
				  $state.go('main.friends');
    			}
	          console.log(res);
	        });
    	};

    	$ctrl.listAlloverContact = function(){
    		$http.post("/api/contact/getAlloverList",{userId: $ctrl.user._id, friendId : $stateParams.id}).then(function(res){
    			$ctrl.listAlloverContact = res.data;
    		})
    	}

    	$ctrl.addToFrined = function(friend){
		  var data = {
		    useridinvite: $ctrl.user._id,
		    useridaccept: friend._id,
		    accepted: false,
		    deleted: false,
		    sendreq: true
		  }
		  $http.post('/api/friend/add', data).then(function(res){
		  	friend.isShowed = false;
		  	friend.isRequest = true;
		  })
		}

		$ctrl.addToContacts = function(contact){
			var data = {'id':contact._id, 'userId' : $ctrl.user._id}
			$http.post('/api/contact/addExist', data).then(function(res){
				console.log(res)
			})
		}

		$ctrl.showHideAddContact = function(){
			$ctrl.friendInfo.contacts.forEach(function(contact){
				if(contact.userId.indexOf($ctrl.user._id) == -1 ){
					contact.isShowed = true;
				}else{
					contact.isShowed = false;
				}
			})
		}

		$ctrl.showHideAddFriend = function(){
			$ctrl.friendInfo.friends.forEach(function(friend){
				if($ctrl.friendsList.indexOf(friend._id) == -1 ){
					if (friend._id == $ctrl.user._id) {
						friend.isShowed = false;
					}else{ 
						friend.isShowed = true;
					}
				}else{
					friend.isShowed = false;
				}
				console.log(2, $ctrl.listRequest)
				$ctrl.listRequest.forEach(function(request){
					console.log(1,request)
					if((request.useridinvite._id == friend._id)|| (request.useridaccept._id == friend._id)){
						friend.isRequest = true;
					}
					else {
						friend.isRequest = false;
					}
				})
			})
		}

		
}]);

