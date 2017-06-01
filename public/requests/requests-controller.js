angular.module('MyApp')
  .controller('RequestsListController', ['$scope', 'UserFactory', '$http', '$stateParams','$state', function($scope, UserFactory, $http, $stateParams, $state){
  	var $ctrl = this;

  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));
    if (!$ctrl.user){
      $state.go('main');
    }else {
   
      $ctrl.requestsList = [];
      $http.post('/api/requests/list', {'userId': $ctrl.user._id}).then(function(res){
        $ctrl.requestsList = res.data;
      });

      $http.post('/api/requests/listFriendsRequests', {'userId': $ctrl.user._id}).then(function(res){
        $ctrl.friendsRequestsList = res.data;
      });
    }
  

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


