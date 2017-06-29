angular.module('MyApp')
  .controller('MainCtrl', ['$scope', '$log',  '$http','AuthFactory', function($scope, $log, $http, AuthFactory) {
  		AuthFactory.me().then(function(res){
  			$scope.user = res.data.data;
  			$http.post('/api/friend/listFriendsRequests',{userId: $scope.user._id}).then(function(res){
  				$scope.listRequest = res.data;
  			})

  			$scope.$on("setTitle",function (event, data) {
  				$scope.title = data.title;
			});
  			
  		})
    
}]);