angular.module('MyApp')
  .controller('RequestsListController', ['$scope', 'user', '$http', '$stateParams','$state','ModalFactory', function($scope, user, $http, $stateParams, $state,ModalFactory){
  	var $ctrl = this;
      $ctrl.user = user.data;
      if (!$ctrl.user){
        $state.go('main');
      }else {
        $ctrl.showAdd = true;
        $ctrl.requestsList = [];
        $http.post('/api/requests/list', {'userId': $ctrl.user._id}).then(function(res){
          $ctrl.requestsList = res.data;
        });

        $http.post('/api/requests/listFriendsRequests', {'userId': $ctrl.user._id}).then(function(res){
          $ctrl.friendsRequestsList = res.data;
        });
      }
    

    	$ctrl.save = function(){
    		$ctrl.request.userId = $ctrl.user._id;
    		$ctrl.request.requestDate = new Date();
    		$http.post('/api/requests/add', $ctrl.request).then(function(res){
            var requestRes =  res.data.request
            requestRes.userId = res.data.user[0];
  	      	$ctrl.requestsList.push(requestRes)
  	    });
    	};

    	$ctrl.deleteRequest = function(id){
    		$http.post('/api/requests/deleteRequest', {'requestId': id}).then(function(res){
          $ctrl.requestsList.forEach(function(item, k){
            if(item._id == id){
              $ctrl.requestsList.splice(k,1)
            }
          })
        });
    	};

      $ctrl.change = function(request){
        ModalFactory.editRequest('myModalContent.html', 'ModalInstanceEditRequestCtrl',request).then(function(ctrl){
          console.log(ctrl.request)
        })
      };
}]);


