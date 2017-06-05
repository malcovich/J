(function(){
	angular.module('MyApp')
		.controller('SignUpController', ['$scope', '$state', '$http', function($scope, $state, $http){
			$scope.showCustomer = true;
			var url  = 'api/user/signup';
			$scope.createUser = function(){
				$http({
					method :'POST', 
					url : url,
					data : $scope.newUser
				}).then(function(res){
					console.log(res)
				},function(error){
					console.log(error)
				});
			}

			$scope.createContact = function(){
				$http({
					method :'POST', 
					url : url,
					data : $scope.newContact
				}).then(function(res){
					console.log(res)
				},function(error){
					console.log(error)
				});
			}
		}])
}())