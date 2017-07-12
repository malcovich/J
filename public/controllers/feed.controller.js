angular.module('MyApp')
  .controller('FeedCtrl', ['$scope', '$log',  '$http', 'user', function($scope, $log, $http, user) {
  			$scope.user = user.data;
  			$http.post('/api/friend/listFriendsRequests',{userId: $scope.user._id}).then(function(res,err){
  				$scope.listRequest = res.data;
  			})

  			$scope.accept = function(id){
  				$http.post('/api/friend/accept',{'_id': id }).then(function(res){

  				});
  			}
}]);