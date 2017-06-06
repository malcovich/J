(function(){
	angular.module('MyApp')
		.controller('NavigationController', ['$scope','$http','$state', 'UserFactory',  function($scope, $http, $state, UserFactory){

			$scope.user = JSON.parse(localStorage.getItem('User-Data'));

			$scope.logUserOut = function(){
				localStorage.removeItem('User-Data');
				UserFactory.setUser(undefined);
				$scope.user = undefined
				$scope.$broadcast('userLogout');
				$state.go('landing');
			}
		}])
}())