angular.module('MyApp')
  .controller('RequestsListController', ['$scope', '$log', 'UserFactory', '$uibModal', '$http', function($scope, $log, UserFactory, $uibModal, $http){
  	var $ctrl = this;
  	$ctrl.requestsList = [];

  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));
	$http.post('/api/requests/list', {'userId': $ctrl.user._id}).then(function(res){
      	$ctrl.requestsList = res.data;
      	console.log($ctrl.requestsList)
    });

    $http.post('/api/requests/listFriendsRequests', {'userId': $ctrl.user._id}).then(function(res){
    });

  	$ctrl.save = function(){
  		$ctrl.request.userId = $ctrl.user._id;
  		$http.post('/api/requests/add', $ctrl.request).then(function(res){
	      	$ctrl.requestsList.push(res)
	    });
  	}
  
	
}]);