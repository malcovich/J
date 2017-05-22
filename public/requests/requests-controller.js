angular.module('MyApp')
  .controller('RequestsListController', ['$scope', '$log', 'UserFactory', '$uibModal', '$http', function($scope, $log, UserFactory, $uibModal, $http){
  	var $ctrl = this;
  	$ctrl.requestsList = [];
  	$ctrl.friendsRequestsList = [];

  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));
	  $http.post('/api/requests/list', {'userId': $ctrl.user._id}).then(function(res){
      	$ctrl.requestsList = res.data;
    });

    $http.post('/api/requests/listFriendsRequests', {'userId': $ctrl.user._id}).then(function(res){
    	$ctrl.friendsRequestsList = res.data;
    });

  	$ctrl.save = function(){
   		$ctrl.request.userId = '5914c111bef45904e0478f1a';
  		// $ctrl.request.userId = $ctrl.user._id;
  		$ctrl.request.requestDate = new Date();
  		$http.post('/api/requests/add', $ctrl.request).then(function(res){
	      	$ctrl.requestsList.push(res)
	    });
  	}

  	$ctrl.deleteRequest = function(id){
		$http.post('/api/requests/deleteRequest', {'requestId': id}).then(function(res){
	    });
  	};

    $ctrl.showModal = function(id_req){
      var modalInstance = $uibModal.open({
        animation: $ctrl.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        controllerAs: '$ctrl',
        resolve: {
          reqId: function(){
            console.log(id_req)
            return id_req;
          },
          friend: function () {
            return $ctrl.friend;
          }
        }
      });

      modalInstance.result.then(function (ctrl) {
        // $ctrl.friend = ctrl.friend;
        // $ctrl.friend.userId = $ctrl.user._id;
        console.log(id_req)
      //   $http.post('/api/friend/add', $ctrl.friend).then(function(res){
      //     $ctrl.friendsList.push(res)
      //   });
      // }, function () {
      //   $log.info('Modal dismissed at: ' + new Date());
      });
    }
	
}]);

angular.module('MyApp').controller('ModalInstanceCtrl', function ($uibModalInstance, reqId) {
  var $ctrl = this;
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

