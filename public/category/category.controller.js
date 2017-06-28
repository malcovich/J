angular.module('MyApp')
  .controller('CategoryController', ['$scope', '$log', 'AuthFactory', '$uibModal', '$http','$state','$stateParams', function($scope, $log, AuthFactory, $uibModal, $http, $state, $stateParams){
  	var $ctrl = this;
  	AuthFactory.me().then(function(res){
        $ctrl.user = res.data.data;
	  	if (!$ctrl.user){
	  		$state.go('main');
	  	}else {
	  		$ctrl.category = [];
			$http.post('/api/categories/item', {'userId': $ctrl.user._id, 'id': $stateParams.id}).then(function(res){
		      	$ctrl.category = res.data;
		    });
		}
	});
}]);