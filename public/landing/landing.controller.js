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
					localStorage.setItem('User-Data', JSON.stringify(res.data));
					UserFactory.setUser(res.data);
					$scope.$broadcast('userLogined');
					$scope.user = res.data;
					$state.go('main');
				}, function(err){
					console.log(err)
				})

		    }, function () {
		      console.info('Modal dismissed at: ' + new Date());
		    });
  		}
  	}

}]);
/*angular.module('MyApp').controller('ModalInstanceCtrl1', function ($uibModalInstance) {
  var $ctrl = this;

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl);
  };

  $ctrl.cancel = function () {
     $uibModalInstance.close($ctrl);
  };
});
*/