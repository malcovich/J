angular.module('MyApp')
  .controller('RequestController', ['$scope', '$log', 'UserFactory', '$uibModal', '$http', '$stateParams', function($scope, $log, UserFactory, $uibModal, $http, $stateParams){
  	var $ctrl = this;
    $ctrl.requestsList = [];
  	$ctrl.allRequests = [];

  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));

    $http.post('/api/requests/item', {'userId': $ctrl.user._id, 'reqId': $stateParams.reqId}).then(function(res){
        $ctrl.request = res.data[0];
    });

    $http.post('/api/contact/all',  {'userId': $ctrl.user._id, 'reqId': $stateParams.reqId}).then(function(res){
        $ctrl.allContatcts = res.data;
        console.log($ctrl.allContatcts)
    });

    /*$http.post('/api/request/all', {'userId': $ctrl.user._id}).then(function(res){
      $ctrl.allRequests =  res.data;
    })*/
  	$ctrl.save = function(){
/*   		$ctrl.request.userId = '5914c111bef45904e0478f1a';*/
  		$ctrl.request.userId = $ctrl.user._id;
  		$ctrl.request.requestDate = new Date();
  		$http.post('/api/requests/add', $ctrl.request).then(function(res){
	      	$ctrl.requestsList.push(res)
	    });
  	}

  	$ctrl.openModalfromNet = function (size) {
      var modalInstance = $uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        controllerAs: '$ctrl',
        size: size,
        resolve: {
          contacts: function () {
            return $ctrl.allContatcts;
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
  
  console.log('2',$ctrl, $ctrl.contacts)
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});