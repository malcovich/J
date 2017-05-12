angular.module('MyApp')
  .controller('RequestsListController', ['$scope', '$log', 'UserFactory', '$uibModal', '$http', function($scope, $log, UserFactory, $uibModal, $http){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));
	/*$http.post('/api/friend/list', {'userId': $ctrl.user._id}).then(function(res){
      	$ctrl.friendsList = res.data;
      });

  	$ctrl.friendsList = [];*/

  	$ctrl.save = function(){
  		$http.post('/api/requests/add', $ctrl.friend).then(function(res){
	      	$ctrl.requestsList.push(res)
	    });
  	}
  
	
}]);