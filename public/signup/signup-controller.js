(function(){
	angular.module('MyApp')
		.controller('SignUpController', ['$scope', '$state', '$http','$rootScope', '$location', '$localStorage', 'AuthFactory', function($scope, $state, $http,$rootScope, $location, $localStorage,AuthFactory){
			var $ctrl = this
			$ctrl.showCustomer = true;

			$ctrl.createUser = function(){
				var formData = {
	                email: this.newUser.email,
	                password: this.newUser.password,
	                name: this.newUser.name,
	                role : 'customer'
	            }
	            AuthFactory.save(formData).then(function(res) {
	            	if (res.data.type){
	            		$localStorage.token = res.data.token;
	                	$state.go('main')
	            	}
	            })
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