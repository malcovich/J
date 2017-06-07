angular.module('MyApp')
  .controller('WorkerController', ['$scope', '$log', 'UserFactory', '$http', '$state', 'ModalFactory', function($scope, $log, UserFactory, $http, $state, ModalFactory){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));
  	console.log($ctrl.user)
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
	    	console.log(ctrl)
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