(function(){
	angular.module('MyApp')
		.controller('NavigationController', ['$scope','$http','$state', 'UserFactory',  function($scope, $http, $state, UserFactory){
				
			$scope.logUserIn = function(){
				$http.post('api/user/login', $scope.login).then(function(res){
					localStorage.setItem('User-Data', JSON.stringify(res.data));
					UserFactory.setUser(res.data);
					$scope.$broadcast('userLogined');
					$scope.user = res.data;
				}, function(err){
					console.log(err)
				})
			};

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