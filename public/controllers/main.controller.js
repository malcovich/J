angular.module('MyApp')
  .controller('MainCtrl', ['$scope', '$log', '$http','user', function($scope, $log, $http, user) {
		$scope.user = user.data;

		$http.post('/api/friend/listFriendsRequests',{userId: $scope.user._id}).then(function(res){
			$scope.listRequest = res.data;
		});

		$scope.$on("setTitle",function (event, data) {
			$scope.title = data.title;
	});
}]);