angular.module('MyApp')
  .controller('FriendController', ['$scope', '$log', 'AuthFactory', '$uibModal', '$http',  '$stateParams', function($scope, $log, AuthFactory, $uibModal, $http, $stateParams){
  	var $ctrl = this;
  	AuthFactory.me().then(function(res){
        $ctrl.user = res.data.data;
		$http.post('/api/friend/item', { 'id': $stateParams.id}).then(function(res){
	      	$ctrl.friend = res.data.friend[0];
	      	$ctrl.constacts = res.data.contacts;
	      	console.log($ctrl.friend, $ctrl.constacts)
	      });
	});
}]);

