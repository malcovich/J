angular.module('MyApp')
  .controller('WorkersProfileController', ['$scope', 'user', '$uibModal', '$http','$state','$stateParams','ModalFactory', function($scope, user, $uibModal, $http, $state, $stateParams, ModalFactory){
  	var $ctrl = this;

  	init();

	function init() {
   	    $ctrl.user = user.data;

   	    $http.post('/api/contact/item', {'_id': $ctrl.user.linked_contact}).then(function(res, err){
            $ctrl.contact = res.data[0];
            $ctrl.copyContact = angular.copy($ctrl.contact);
        });
	};

	$ctrl.save = function(){
		var obj = {
			'name' : $ctrl.contact.name,
			'spec' : $ctrl.contact.spec, 
			'description': $ctrl.contact.description
		}
		$http.post('/api/contact/updateInfoByContact',{'id' : $ctrl.contact._id, 'obj' : obj}).then(function(res, err){

		})
	}
}]);

