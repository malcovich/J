angular.module('MyApp')
  .controller('FriendController', ['$scope', '$log', 'AuthFactory', '$uibModal', '$http',  '$stateParams', function($scope, $log, AuthFactory, $uibModal, $http, $stateParams){
  	var $ctrl = this;
  	console.log($ctrl)
  	AuthFactory.me().then(function(res){
        $ctrl.user = res.data.data;
		$http.post('/api/friend/item', {'friendId': $stateParams.id}).then(function(res){
	      	$ctrl.contactList = res.data;
	    });
	});
}]);

