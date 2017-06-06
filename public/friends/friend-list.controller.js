angular.module('MyApp')
  .controller('FriendsListController', ['$scope', 'UserFactory', '$uibModal', '$http','$state', 'ModalFactory', function($scope, UserFactory, $uibModal, $http, $state, ModalFactory){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));

  	if (!$ctrl.user){
  		$state.go('main');
  	}else {
  		$ctrl.friendsList = [];

		$http.post('/api/friend/list', {'userId': $ctrl.user._id}).then(function(res){
	      	$ctrl.friendsList = res.data;
	    });
  	}

  	$ctrl.open = function(){
  		ModalFactory.open('myModalContent.html', 'ModalInstanceCtrl1').then(function(ctrl){
  			$ctrl.friend = ctrl.friend;
		    $ctrl.friend.userId = $ctrl.user._id;
		    $http.post('/api/friend/add', $ctrl.friend).then(function(res){
		      $ctrl.friendsList.push(res)
		    });
		    }, function () {
		      console.info('Modal dismissed at: ' + new Date());
		    });
  	}
}]);

angular.module('MyApp').controller('ModalInstanceCtrl1', function ($uibModalInstance, $state) {
  var $ctrl = this;

  /*$document.on('click', function(event) {
      $uibModalInstance.dismiss('cancel');
  });
*/
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $ctrl.createAccount = function(){
    $uibModalInstance.close($ctrl);
    $state.go('signUp')
  }
});