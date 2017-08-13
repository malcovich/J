angular.module('MyApp')
  .controller('LandingController', ['$scope', '$http', '$stateParams','$state','ModalFactory','$rootScope', '$location', '$localStorage', 'AuthFactory', function($scope, $http, $stateParams, $state,ModalFactory,$rootScope ,$location,$localStorage, AuthFactory){
  	var $ctrl = this;
	  if ($localStorage.token){
  		$state.go('main.categories');
  	}else {
  		$ctrl.login = function(){
        var formData = {
            email: this.login.email,
            password: this.login.password
          }

        AuthFactory.signin(formData).then(function(res){
          if (res.type == false) {
              alert(res.data)    
          } else {
            $localStorage.token = res.data.token;
            if (res.data.data.role == "customer"){
              $state.go("main.requests");    
            }else {
              $state.go("main.worker")
            }
          }
        })
		  };

      $ctrl.loginFB = function(){
        FB.login(function(response) {
          if (response.authResponse) {
            FB.api('/me', {fields: 'id,name,picture,about, birthday,cover, first_name, education,gender, hometown, interested_in,  last_name, location, relationship_status, work'}, function(response) {
                console.log( response);
            });
          } else {
           console.log('User cancelled login or did not fully authorize.');
          }
        });
      }
  	}
}]);