angular.module('MyApp')
  .controller('MainCtrl', ['$scope', '$log', '$http','user','$location','CountFactory', function($scope, $log, $http, user, $location, CountFactory ) {
		$scope.user = user.data;
		$scope.friendsRequestsCount = 0

		$scope.isActive = function (viewLocation) { 
	        return viewLocation === $location.path();
	    };

	    $http.post('/api/requests/listFriendsRequestsNew', {'userId': $scope.user._id}).then(function(res){
	        $scope.friendsRequestsList = res.data;
	        console.log($scope.friendsRequestsList.length, $scope.friendsRequestsList.length> 0 ? 1 : 0)
	        console.log(CountFactory.getCounterRequests(), CountFactory.getCounterRequests() + $scope.friendsRequestsList.length> 0 ? 1 : 0)
	        CountFactory.setCounterRequests(CountFactory.getCounterRequests() + $scope.friendsRequestsList.length> 0 ? 1 : 0 );
	        $scope.friendsRequestsCount = CountFactory.getCounterRequests();
        });

        $http.post('/api/requests/getAllAnswersNew', {'userId':$scope.user._id}).then(function(res){
        	$scope.listAnswersNew = res.data;
        	 console.log('2',CountFactory.getCounterRequests(), $scope.listAnswersNew.length > 0 ? 1 : 0)
         	CountFactory.setCounterRequests(CountFactory.getCounterRequests() + $scope.listAnswersNew.length > 0 ? 1 : 0 );
	        $scope.friendsRequestsCount = CountFactory.getCounterRequests();
        });

        

		$scope.$on("setTitle",function (event, data) {
			$scope.title = data.title;
		});
}]);