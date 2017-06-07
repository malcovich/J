angular.module('MyApp')
  .controller('WorkerAdminController', ['$scope', '$log', 'UserFactory', '$http', '$state', 'ModalFactory', function($scope, $log, UserFactory, $http, $state, ModalFactory){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));

  	$http.post('/api/contact/itemFull', {'_id': $ctrl.user._id }).then(function(res){
        $ctrl.contact = res.data[0];
    });

  	if (!$ctrl.user){
  		$state.go('main');
  	}else {
  		
	}

}]);