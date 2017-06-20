(function(){
	angular.module('MyApp')
		.controller('NavigationController', ['$scope','$http','$state', 'AuthFactory',  function($scope, $http, $state, AuthFactory){
			AuthFactory.me().then(function(res){
	  			$scope.user = res.data.data;
	  		})
			$scope.logUserOut = function(){
				AuthFactory.logout();
			}
			$scope.goToSearch = function(){
				console.log('e',$scope.query)
				$state.go('main.search', {'q': $scope.query})
			}

		}])
}())