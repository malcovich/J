(function(){
	angular.module('MyApp')
		.controller('SignUpController', ['$scope', '$state', '$http', function($scope, $state, $http){
			var $ctrl = this
			$ctrl.showCustomer = true;
			var url  = 'api/user/signup';
			 $ctrl.createUser = function(){
				$http({
					method :'POST', 
					url : url,
					data :  $ctrl.newUser
				}).then(function(res){
					console.log(res)
				},function(error){
					console.log(error)
				});
			}

			 $ctrl.createContact = function(){
				$http({
					method :'POST', 
					url : 'api/contact/signup',
					data :  $ctrl.newContact
				}).then(function(res){
					$state.go('main.worker')
				},function(error){
					console.log(error)
				});
			}
		}])
}())