angular.module('MyApp')
  .controller('CalendarController', ['$scope', 'user', '$uibModal', '$http','$state','$stateParams','ModalFactory', function($scope, user, $uibModal, $http, $state, $stateParams, ModalFactory){
  	var $ctrl = this;

  	init();

	function init() {
   	    $ctrl.user = user.data;

   	    $http.post('/api/contact/item', {'_id': $ctrl.user.linked_contact}).then(function(res, err){
            $ctrl.contact = res.data;
            console.log($ctrl.contact)
        });
	};

	$ctrl.loadCategories = function () {
		$http.post('/api/categories/list', {'userId': $ctrl.user._id}).then(function(res){
		    $ctrl.listCategories = res.data;
		});
	}
	
	$ctrl.save = function () {
		var obj = {
			'fixedWorkingPeriod' : $ctrl.contact.fixedWorkingPeriod,
			'periodForClient': $ctrl.contact.periodForClient,
		};
		
		$http.post('/api/contact/updateInfoByContact',{'id' : $ctrl.contact._id, 'obj' : obj}).then(function(res, err){

		})
	}
}]);

