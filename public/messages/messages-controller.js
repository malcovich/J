angular.module('MyApp')
  .controller('MessagesController', ['$scope', '$http', '$stateParams', '$log','$state', 'ModalFactory','UserFactory', function($scope, $http, $stateParams, $log, $state,ModalFactory,UserFactory){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));

  	$http.post('/api/messages/list', {'id': $ctrl.user._id}).then(function(res){
  		$ctrl.messages = res.data;
  	});
  
}]);