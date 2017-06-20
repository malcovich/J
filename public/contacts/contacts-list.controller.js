angular.module('MyApp')
  .controller('ContactsListController', ['$scope', '$log', 'AuthFactory', '$uibModal', '$http','$state','ModalFactory', function($scope, $log, AuthFactory, $uibModal, $http, $state, ModalFactory){
  	var $ctrl = this;
  	AuthFactory.me().then(function(res){
        $ctrl.user = res.data.data;
	  	if (!$ctrl.user){
	  		$state.go('main');
	  	}else {
	  		$ctrl.contactsList = [];
			$http.post('/api/contact/list', {'userId': $ctrl.user._id}).then(function(res){
		      	$ctrl.contactsList = res.data;
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
	});
}]);