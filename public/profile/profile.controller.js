angular.module('MyApp')
  .controller('ProfileCtrl', ['$scope', '$log', 'UserFactory', '$uibModal', '$http','$state','ModalFactory', function($scope, $log, UserFactory, $uibModal, $http, $state, ModalFactory){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));
  	$ctrl.copyUser = angular.copy($ctrl.user);

  	if (!$ctrl.user){
  		$state.go('main');
  	}else {
  			console.log($ctrl.user)

  		$ctrl.updateUser  =  function(){
  			$http.post('/api/user/updateProfile', $ctrl.copyUser).then(function(res){
  				localStorage.setItem('User-Data', JSON.stringify(res.data));
  				$ctrl.user = res.data;
  				$ctrl.change = false;
  			})
  		}
	}
}]);