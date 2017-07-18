angular.module('MyApp')
  .controller('CategoryController', ['$scope', '$log', 'user', '$uibModal', '$http','$state','$stateParams','ModalFactory', function($scope, $log, user, $uibModal, $http, $state, $stateParams, ModalFactory){
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

angular.module('MyApp').controller('addContact', function ($uibModalInstance, $state, categories, selected) {
  var $ctrl = this;
  $ctrl.contact = {};
  $ctrl.categories = categories;

  $ctrl.categories.forEach(function(i,index){
  	if (i._id == selected._id){
  		$ctrl.selected = i;
  	};
  });

  $ctrl.contact.category = $ctrl.selected._id;
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

