angular.module('MyApp')
  .controller('CategoryListController', ['$scope', '$log', 'AuthFactory', '$uibModal', '$http','$state','ModalFactory', function($scope, $log, AuthFactory, $uibModal, $http, $state, ModalFactory){
  	var $ctrl = this;
  	AuthFactory.me().then(function(res){
        $ctrl.user = res.data.data;
	  	if (!$ctrl.user){
	  		$state.go('main');
	  	}else {
	  		$ctrl.categories = [];
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
	});
}]);