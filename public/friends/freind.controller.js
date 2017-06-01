angular.module('MyApp')
  .controller('FriendController', ['$scope', '$log', 'UserFactory', '$uibModal', '$http', function($scope, $log, UserFactory, $uibModal, $http){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));

  	$ctrl.friendsList = [];
  	console.log($ctrl.user._id)

	$http.post('/api/friend/list', {'userId': $ctrl.user._id}).then(function(res){
      	$ctrl.friendsList = res.data;
      	console.log($ctrl.friendsList)
      });

    $ctrl.open = function (size) {
	    // var parentElem = parentSelector ? 
	    //   angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	    var modalInstance = $uibModal.open({
	      animation: $ctrl.animationsEnabled,
	      ariaLabelledBy: 'modal-title',
	      ariaDescribedBy: 'modal-body',
	      templateUrl: 'myModalContent.html',
	      controller: 'ModalInstanceCtrl',
	      controllerAs: '$ctrl',
	      size: size,
	      resolve: {
	        friend: function () {
	          return $ctrl.friend;
	        }
	      }
	    });

	    modalInstance.result.then(function (ctrl) {
	      $ctrl.friend = ctrl.friend;
	      $ctrl.friend.userId = $ctrl.user._id;
	      console.log($ctrl.friend)
	      $http.post('/api/friend/add', $ctrl.friend).then(function(res){
	      	$ctrl.friendsList.push(res)
	      });
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	};
	
}]);

angular.module('MyApp').controller('ModalInstanceCtrl', function ($uibModalInstance) {
  var $ctrl = this;
  

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});