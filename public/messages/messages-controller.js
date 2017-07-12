angular.module('MyApp')
  .controller('MessagesController', ['$scope', '$http', '$stateParams', '$log','$state', 'ModalFactory','user', function($scope, $http, $stateParams, $log, $state,ModalFactory,user){
  	var $ctrl = this;
  	
	$ctrl.user = user.data;
  	$http.post('/api/messages/list', {'id': $ctrl.user._id}).then(function(res){
  		$ctrl.messages = res.data;
  	});
  
}]);