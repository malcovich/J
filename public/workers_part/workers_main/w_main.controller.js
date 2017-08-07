angular.module('MyApp')
  .controller('WorkersMainController', ['$scope', 'user', '$uibModal', '$http','$state','$stateParams','ModalFactory', function($scope, user, $uibModal, $http, $state, $stateParams, ModalFactory){
  	var $ctrl = this;
    $ctrl.user = user.data;
    $ctrl.r = 4;
  	if (!$ctrl.user){
  		$state.go('main');
  	}else {
  		$ctrl.category = [];
		$http.post('/api/categories/item', {'userId': $ctrl.user._id, 'id': $stateParams.id}).then(function(res){
	    $ctrl.category = res.data;
	  });

	    $ctrl.addContact = function(){
	    	$ctrl.listCategories = [];
	    	$ctrl.contactsList = []
	    	$http.post('/api/categories/list', {'userId': $ctrl.user._id}).then(function(res){
		      $ctrl.listCategories = res.data;

			    ModalFactory.openAddContactModal('addContact.html', 'addContact', $ctrl.listCategories, $ctrl.category.category).then(function(ctrl){
            $ctrl.contact = ctrl.contact;
            $ctrl.contact.userId = [$ctrl.user._id];
            $ctrl.contact.raiting = 0;
				    $ctrl.contact.userCreated = true;
				    $http.post('/api/contact/add', $ctrl.contact).then(function(res){
                console.log($ctrl.category.contacts)
			      		$ctrl.category.contacts.push(res.data)
			      	});
				    }, function () {
				    console.info('Modal dismissed at: ' + new Date());
				  });
			  });
		  }
		}

    $ctrl.changeHiddenStatus = function(contact){
      $http.post("/api/contact/changeHiddenStatus", {id: contact._id, hidden: !contact.hidden })
    }
}]);

