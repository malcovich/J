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
	                	$state.go('main.requests')
	            	}
	            })
			}

			$ctrl.createContact = function(){
				var formData = {
	                email: this.newContact.email,
	                password: this.newContact.password,
	                name: this.newContact.name,
	                role : 'worker'
	            }
	            AuthFactory.save(formData).then(function(res) {
	            	if (res.data.type){
	            		$localStorage.token = res.data.token;
	                	$state.go('main.requests')
	            	}
	            })
			}


			$ctrl.createFB = function(){
				FB.getLoginStatus(function(response) {
				  if (response.status === 'connected') {
				    // the user is logged in and has authenticated your
				    // app, and response.authResponse supplies
				    // the user's ID, a valid access token, a signed
				    // request, and the time the access token 
				    // and signed request each expire
				    var uid = response.authResponse.userID;
				    var accessToken = response.authResponse.accessToken;
				    var formData = {
				    	fbId : uid
				    }

				    AuthFactory.signin(formData).then(function(res){
        				$localStorage.token = res.data.token;
        				$state.go('main.requests')
        			});
        			
				  } else if (response.status === 'not_authorized') {
				    // the user is logged in to Facebook, 
				    // but has not authenticated your app
				    AuthFactory.save(formData).then(function(res) {
				            	if (res.data.type){
				            		$localStorage.token = res.data.token;
				                	$state.go('main.requests')
				            	}
				            })
				  } else {
				    // the user isn't logged in to Facebook.
				  }
			 	});
				FB.login(function(response) {
			        if (response.authResponse) {
			            FB.api('/me', {fields: 'id,name,picture,about, birthday,cover, first_name, education,gender, hometown, interested_in,  last_name, location, relationship_status, work'}, function(response) {
			            	console.log( response);
			            	var formData = {};
			            	formData.name = response.name;
			            	formData.email = response.email;
			            	formData.fbId = response.id;
			            	formData.role = 'customer'
			            	
			           	});
			        } else {
			           console.log('User cancelled login or did not fully authorize.');
			        }
		        });
			}
	}])
}())