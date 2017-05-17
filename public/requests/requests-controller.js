angular.module('MyApp')
  .controller('RequestsListController', ['$scope', '$log', 'UserFactory', '$uibModal', '$http', function($scope, $log, UserFactory, $uibModal, $http){
  	var $ctrl = this;
  	$ctrl.requestsList = [];
  	$ctrl.friendsRequestsList = [];

  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));
	$http.post('/api/requests/list', {'userId': $ctrl.user._id}).then(function(res){
      	$ctrl.requestsList = res.data;
    });

    $http.post('/api/requests/listFriendsRequests', {'userId': $ctrl.user._id}).then(function(res){
    	$ctrl.friendsRequestsList = res.data;
    });

  	$ctrl.save = function(){
/*  		$ctrl.request.userId = '59198f2dd114d349cc06d240';*/
  		$ctrl.request.userId = $ctrl.user._id;
  		$ctrl.request.requestDate = new Date();
  		$http.post('/api/requests/add', $ctrl.request).then(function(res){
	      	$ctrl.requestsList.push(res)
	    });
  	}

  	$ctrl.deleteRequest = function(id){
  		console.log(id)
		$http.post('/api/requests/deleteRequest', {'requestId': id}).then(function(res){
			console.log(id)
	    });
  	}
	
}]);