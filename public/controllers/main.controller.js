angular.module('MyApp')
  .controller('MainCtrl', ['$scope', '$log', '$http','user','$location','CountFactory', function($scope, $log, $http, user, $location, CountFactory ) {
		$scope.user = user.data;
		console.log($scope.user)
		$scope.friendsRequestsCount = 0

		$scope.isActive = function (viewLocation) { 
	        return viewLocation === $location.path();
	    };

/*	    $http.post('/api/requests/listFriendsRequestsNew', {'userId': $scope.user._id}).then(function(res){
	        $scope.friendsRequestsList = res.data;
	        console.log(1,$scope.friendsRequestsList)
	        if ($scope.friendsRequestsList.length> 0){
	        	var counter = CountFactory.getCounterRequests() + 1;
	        	CountFactory.setCounterRequests(counter);
	        }
	        $scope.friendsRequestsCount = CountFactory.getCounterRequests();
        });

        $http.post('/api/requests/getAllAnswersNew', {'userId':$scope.user._id}).then(function(res){
        	$scope.listAnswersNew = res.data;
         	CountFactory.setCounterRequests(CountFactory.getCounterRequests() + $scope.listAnswersNew.length > 0 ? 1 : 0 );
         	if ($scope.friendsRequestsList.length> 0){
	        	var counter = CountFactory.getCounterRequests() + 1;
	        	CountFactory.setCounterRequests(counter);
	        }
	        $scope.friendsRequestsCount = CountFactory.getCounterRequests();
        });

       $scope.$watch(CountFactory.getCounterRequests(), function(oldV, newV){
       	console.log('@',newV)
       })
*/
        

		$scope.$on("setTitle",function (event, data) {
			$scope.title = data.title;
		});
}]);