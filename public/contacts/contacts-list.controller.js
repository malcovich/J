angular.module('MyApp')
  .controller('ContactsListController', ['$scope', '$log', 'UserFactory', '$uibModal', '$http', function($scope, $log, UserFactory, $uibModal, $http){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));
	$http.post('/api/contact/list', {'userId': $ctrl.user._id}).then(function(res){
      	$ctrl.contactsList = res.data;
      });

  	$ctrl.contactsList = [];
    $ctrl.open = function (size) {
	    // var parentElem = parentSelector ? 
	    //   angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	    console.log('@')
	    var modalInstance = $uibModal.open({
	      animation: $ctrl.animationsEnabled,
	      ariaLabelledBy: 'modal-title',
	      ariaDescribedBy: 'modal-body',
	      templateUrl: 'myModalContent.html',
	      controller: 'ModalInstanceCtrl',
	      controllerAs: '$ctrl'
	    });

	    modalInstance.result.then(function (ctrl) {
	    	console.log(ctrl)
	      $ctrl.contact = ctrl.contact;
/*	    modalInstance.result.then(function (contact) {
	      $ctrl.contact = contact;
	      console.log($ctrl.contact)*/
	      $ctrl.contact.userId = $ctrl.user._id;
	     /* $ctrl.contact.userId = '59198f2dd114d349cc06d240';*/
	      console.log( $ctrl.contact)
	      $http.post('/api/contact/add', $ctrl.contact).then(function(res){
	      	console.log(res)
	      	$ctrl.contactsList.push(res)
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