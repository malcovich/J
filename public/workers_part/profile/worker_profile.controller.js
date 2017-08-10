angular.module('MyApp')
  .controller('WorkersProfileController', ['$scope', 'user', '$uibModal', '$http','$state','$stateParams','ModalFactory', function($scope, user, $uibModal, $http, $state, $stateParams, ModalFactory){
  	var $ctrl = this;

  	init();

	function init() {
   	    $ctrl.user = user.data;

   	    $http.post('/api/contact/item', {'_id': $ctrl.user.linked_contact}).then(function(res, err){
            $ctrl.contact = res.data[0];
            $ctrl.copyContact = angular.copy($ctrl.contact);
            $ctrl.loadCategories();
        });
	};

	$ctrl.loadCategories = function(){
		$http.post('/api/categories/list', {'userId': $ctrl.user._id}).then(function(res){
		    $ctrl.listCategories = res.data;
		    console.log($ctrl.listCategories)
		});
	}

	$ctrl.save = function(){
		var obj = {
			'name' : $ctrl.contact.name,
			'spec' : $ctrl.contact.spec, 
			'description': $ctrl.contact.description,
			'category' : $ctrl.contact.category
		};
		
		$http.post('/api/contact/updateInfoByContact',{'id' : $ctrl.contact._id, 'obj' : obj}).then(function(res, err){

		})
	}
}]);

