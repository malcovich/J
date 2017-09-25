(function(){
	angular.module('MyApp')
    .controller('searchController', ['$scope', '$http','$stateParams', 'user', 'FriendFactory', function($scope, $http,$stateParams, user, FriendFactory){
			$ctrl = this;
      $ctrl.user = user.data;
      var userID = $ctrl.user._id;
      var friendsList = [];

			if($stateParams.q != undefined){
				$http.post('/api/search',{'q': $stateParams.q,'userId': userID}).then(function(res){
					$ctrl.searchResut = res.data;
          getListFriendsId();
          getListRequests();
  			});
  		};

			$ctrl.addToContacts = function(contact){
				var data = {'id':contact._id, 'userId' : userID}
				$http.post('/api/contact/addExist', data).then(function(res){
					console.log(res)
				})
			};

      function getListFriendsId (){
        FriendFactory.getListFriends({'userId': userID}).then(function(res){
          $ctrl.friendsList = res.data;

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

        });
      };

      function getListRequests (){
        FriendFactory.getListFriendsRequests({userId: userID}).then(function(res,err){
          $ctrl.listRequest = res.data;
          
          FriendFactory.getListSendedRequests({userId: userID}).then(function(res,err){
            $ctrl.listRequestSended =[].concat(res.data,$ctrl.listRequest);
          });
        });
      };

		}])
}())