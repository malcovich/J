angular.module('MyApp')
  .controller('WorkersProfileController', ['$scope', 'user', '$uibModal', '$http','$state','$stateParams','ModalFactory', function($scope, user, $uibModal, $http, $state, $stateParams, ModalFactory){
  	var $ctrl = this;
  	console.log('1')
    $ctrl.user = user.data;
	console.log($ctrl)  
}]);

