angular.module('MyApp')
  .controller('LandingController', ['$scope', '$http', '$stateParams', '$log','$state', 'ModalFactory','UserFactory', function($scope, $http, $stateParams, $log, $state,ModalFactory,UserFactory){
  	var user = JSON.parse(localStorage.getItem('User-Data'));
  	var $ctrl = this;
  	 
	  if (user){
  		$state.go('main');
  	}else {
  		$ctrl.open = function(){
  			ModalFactory.open('login.html', 'ModalInstanceCtrl1').then(function(ctrl){
				$http.post('api/user/login', ctrl.login).then(function(res){
          res.data.user.type = res.data.type;
					localStorage.setItem('User-Data', JSON.stringify(res.data.user));
					UserFactory.setUser(res.data.user);
					$scope.$broadcast('userLogined');
					$scope.user = res.data.user;
          if (res.data.type == "Woker"){
            $state.go("main.worker",{'id':res.data.user._id});
          }else{
            $state.go('main');
          }
				}, function(err){
					console.log(err)
				})

		    }, function () {
		      console.info('Modal dismissed at: ' + new Date());
		    });
  		}
  	}
}]);