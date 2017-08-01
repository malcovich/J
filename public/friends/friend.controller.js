angular.module('MyApp')
  .controller('FriendController', ['$scope', '$log', 'user', '$state','$uibModal', '$http',  '$stateParams', function($scope, $log, user, $state,$uibModal, $http, $stateParams){
  	var $ctrl = this;
        $ctrl.user = user.data;
		$http.post('/api/friend/item', {'friendId': $stateParams.id}).then(function(res){
	      	$ctrl.friendInfo = res.data;
	      	var userId =  $ctrl.user._id;
	      	console.log("userId", userId)
	      	var friendId = $ctrl.friendInfo.friend._id;
		    $ctrl.showHideAddContact()
	      	var friends = [];

		      for (var i = 0; i < $ctrl.friendInfo.friends.length; i++) {
		        if ($ctrl.friendInfo.friends[i].useridaccept._id == friendId ) {
		          friends.splice(i, 1, $ctrl.friendInfo.friends[i].useridinvite);
		        } else {
		          friends.splice(i, 1, $ctrl.friendInfo.friends[i].useridaccept);
		        }
		      }
		      $ctrl.friendInfo.friends = friends;
	    });

    	$ctrl.deleteFriend = function(id){
    		var params = {'friendId': id, 'userId': $ctrl.user._id}
			console.log("param",params);

    		$http.post('/api/friend/deleteFriend', params).then(function(res){
    			$ctrl.friendData = res.data;

    			if ($ctrl.friendData.deleted == true) {
				  $state.go('main.friends');
    			}
	          console.log(res);
	        });
    	};

    	$ctrl.addToFrined = function(id){
		  var data = {
		    useridinvite: $ctrl.user._id,
		    useridaccept: id,
		    accepted: false,
		    deleted: false,
		    sendreq: true
		  }
		  $http.post('/api/friend/add', data).then(function(res){

		  	console.log("res", res)
		  	alert("request sended");
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
}]);

