angular.module('MyApp')
  .controller('FriendController', ['$scope', '$log', 'AuthFactory', '$uibModal', '$http',  '$stateParams', function($scope, $log, AuthFactory, $uibModal, $http, $stateParams){
  	var $ctrl = this;
  	console.log($ctrl)
  	AuthFactory.me().then(function(res){
        $ctrl.user = res.data.data;
		$http.post('/api/friend/item', {'friendId': $stateParams.id}).then(function(res){
	      	$ctrl.friendInfo = res.data;
	      	var userId =  $ctrl.user._id;
	      	console.log("userId", userId)
	      	var friendId = $ctrl.friendInfo.friend._id;

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
    		console.log('apds', id)
    		$http.post('/api/friend/deleteFriend', {'friendId': id}).then(function(res){
	          // $ctrl.requestsList.forEach(function(item, k){
	          //   if(item._id == id){
	          //     $ctrl.requestsList.splice(k,1)
	          //   }
	          // })
	          console.log(res);
	        });
    	};
	});
}]);

