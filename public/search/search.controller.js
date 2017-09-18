(function(){
	angular.module('MyApp')
		.controller('searchController', ['$scope', '$state', '$http','$stateParams', 'user', function($scope, $state, $http,$stateParams, user){
			$ctrl = this;
      			$ctrl.user = user.data;

				if($stateParams.q != undefined){
					$ctrl.q = $stateParams.q;
					$http.post('/api/search',{'q': $stateParams.q,'userId': $ctrl.user._id}).then(function(res){
						$ctrl.searchResut = res.data;

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

					})
				}

				$ctrl.showHideAddFriend = function(){
					$ctrl.searchResut.users.forEach(function(friend){
						if($ctrl.friendsList.indexOf(friend._id) == -1 ){
							console.log(friend, friend._id == $ctrl.user._id)
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
							if((request.useridinvite && (request.useridinvite._id == friend._id))|| (request.useridaccept && (request.useridaccept._id == friend._id))){
								friend.isRequest = true;
							}
							else {
								friend.isRequest = false;
							}
						})
						console.log(friend.isShowed)
					})
				}

				$ctrl.addToFrined = function(id){
					var data = {
						useridinvite: $ctrl.user._id,
						useridaccept: id,
						accepted: false,
						deleted: false,
						sendreq: true
					}
					$http.post('/api/friend/add', data).then(function(res){
						var request = res.data;
						if (request.accepted === false && request.sendreq === true) {
							console.log ("you just send request, button change to cancel request");
						} 
						if (request.accepted === true && request.sendreq === false) {
							console.log ("button its your friend");
						} 
						if (request.accepted === false && request.sendreq === false) {
							console.log ("button add to friend");
						}
						console.log(res)
					})
				}

				$ctrl.addToContacts = function(contact){
					var data = {'id':contact._id, 'userId' : $ctrl.user._id}
					$http.post('/api/contact/addExist', data).then(function(res){
						console.log(res)
					})
				}
		}])
}())