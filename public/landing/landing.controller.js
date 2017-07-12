angular.module('MyApp')
  .controller('LandingController', ['$scope', '$http', '$stateParams','$state','ModalFactory','$rootScope', '$location', '$localStorage', 'AuthFactory', function($scope, $http, $stateParams, $state,ModalFactory,$rootScope ,$location,$localStorage, AuthFactory){
  	var $ctrl = this;
	  if ($localStorage.token){
  		$state.go('main');
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
            $state.go("main.feed");    
          }
        })
		  };
  	}
}]);