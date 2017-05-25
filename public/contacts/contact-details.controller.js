angular.module('MyApp')
  .controller('ContactDetailsController', ['$scope', '$http', '$stateParams', '$log' function($scope, $http, $stateParams, $log){
	var $ctrl = this;
	$ctrl.contact = {
		name: 'Test';
		surname: 'Testenko';
		id: 123;
	};

}]);
