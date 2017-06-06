angular.module('MyApp')
  .controller('WorkerController', ['$scope', '$http', '$stateParams', '$log','$state', function($scope, $http, $stateParams, $log, $state){
  	var user = JSON.parse(localStorage.getItem('User-Data'));
  	console.log(user)
	
}]);
