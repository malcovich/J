angular.module('MyApp')
  .controller('MainCtrl', ['$scope', '$log', '$http','user','$location','CountFactory', function($scope, $log, $http, user, $location, CountFactory ) {
		$scope.user = user.data;

		$scope.isActive = function (viewLocation) { 
	        return viewLocation === $location.path();
	    };

	    $http.post('/api/requests/listFriendsRequestsNew', {'userId': $scope.user._id}).then(function(res){
	        $scope.friendsRequestsList = res.data;
	        $scope.friendsRequestsCount = $scope.friendsRequestsList.length;
	        CountFactory.setCounterRequests(CountFactory.getCounterRequests + $scope.friendsRequestsList.length> 0 ? 1 : 0 );
        });

		$scope.$on("setTitle",function (event, data) {
			$scope.title = data.title;
		});
}]);