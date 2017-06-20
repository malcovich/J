angular.module('MyApp')
  .controller('MessagesController', ['$scope', '$http', '$stateParams', '$log','$state', 'ModalFactory','AuthFactory', function($scope, $http, $stateParams, $log, $state,ModalFactory,AuthFactory){
  	var $ctrl = this;
  	AuthFactory.me().then(function(res){
  		$ctrl.user = res.data.data;
	  	$http.post('/api/messages/list', {'id': $ctrl.user._id}).then(function(res){
	  		$ctrl.messages = res.data;
	  	});
  	})
  
}]);