angular.module('MyApp')
  .controller('CategoryListController', ['$scope', '$log', 'user', '$uibModal', '$http','$state','ModalFactory', function($scope, $log, user, $uibModal, $http, $state, ModalFactory){
  	var $ctrl = this;

    $ctrl.user = user.data;
  	$ctrl.categories = [];

  	if (!$ctrl.user){
  		$state.go('login');
  	}else {
		$http.post('/api/categories/list', {'userId': $ctrl.user._id}).then(function(res){
	      	$ctrl.categories = res.data;
	    });
	}

    $ctrl.open = function (size) {
	    ModalFactory.open('myModalContent.html', 'ModalInstanceCtrl').then(function(ctrl){
	      	$ctrl.contact = ctrl.contact;
	     	$ctrl.contact.userId = $ctrl.user._id;
	    	$http.post('/api/contact/add', $ctrl.contact).then(function(res){
	      		$ctrl.contactsList.push(res)
	      	});
		}, function () {
		    console.info('Modal dismissed at: ' + new Date());
		});
	};

}]);