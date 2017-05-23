angular.module('MyApp')
  .controller('RequestController', ['$scope', '$log', 'UserFactory', '$uibModal', '$http', '$stateParams', function($scope, $log, UserFactory, $uibModal, $http, $stateParams){
  	var $ctrl = this;
  	$ctrl.requestsList = [];
  	$ctrl.friendsRequestsList = [];

  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));

    $http.post('/api/requests/item', {'userId': $ctrl.user._id, 'reqId': $stateParams.reqId}).then(function(res){
        $ctrl.request = res.data[0];
    });

  	$ctrl.save = function(){
/*   		$ctrl.request.userId = '5914c111bef45904e0478f1a';*/
  		$ctrl.request.userId = $ctrl.user._id;
  		$ctrl.request.requestDate = new Date();
  		$http.post('/api/requests/add', $ctrl.request).then(function(res){
	      	$ctrl.requestsList.push(res)
	    });
  	}

  	$ctrl.deleteRequest = function(id){
  		$http.post('/api/requests/deleteRequest', {'requestId': id}).then(function(res){});
  	};
	
}]);

