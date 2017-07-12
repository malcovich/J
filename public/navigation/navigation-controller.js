(function(){
	angular.module('MyApp')
		.controller('NavigationController', ['$rootScope','$scope','$http','$state', 'user',  function($rootScope, $scope, $http, $state, user){
	  		$scope.user = user.data;
			$scope.logUserOut = function(){
				AuthFactory.logout();
			}
			$scope.goToSearch = function(){
				console.log('e',$scope.query)
				$state.go('main.search', {'q': $scope.query})
			}

			$rootScope.$on('changeProfile', function(event, data){
				$scope.user = data.user;
			})

		}])
}())