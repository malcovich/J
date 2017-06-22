angular.module('MyApp')
  .controller('FriendsListController', ['$scope', 'UserFactory', '$uibModal', '$http','$state', 'ModalFactory','AuthFactory', function($scope, UserFactory, $uibModal, $http, $state, ModalFactory,AuthFactory){
  	var $ctrl = this;

  	AuthFactory.me().then(function(res){
        $ctrl.user = res.data.data;
    	if (!$ctrl.user){
    		$state.go('landing');
    	}else {
    		$ctrl.friendsList = [];

  		$http.post('/api/friend/list', {'userId': $ctrl.user._id}).then(function(res){
  	      	$ctrl.friendsList = res.data;
            var userID = $ctrl.user._id;
            var list = $ctrl.friendsList;
            
            for (var i = 0; i < list.length; i++) {
                var friendID = [];
                
                if (list.useridinvite = userID) {
                    friendID == list[i].useridaccept;
                    console.log("xx ", list[i].useridaccept)
                } else {

                }
              }
              console.log("list", list);
              console.log("userID", userID);
      	    });
        	}



    	$ctrl.open = function(){
    		ModalFactory.open('myModalContent.html', 'ModalInstanceCtrl1').then(function(ctrl){
    			$ctrl.friend = ctrl.friend;
  		    $ctrl.friend.userId = $ctrl.user._id;
  		    $http.post('/api/friend/add', $ctrl.friend).then(function(res){
  		      $ctrl.friendsList.push(res)
  		    });
  		    }, function () {
  		      console.info('Modal dismissed at: ' + new Date());
  		    });
    	}

  })
}]);

angular.module('MyApp').controller('ModalInstanceCtrl1', function ($uibModalInstance, $state) {
  var $ctrl = this;

  /*$document.on('click', function(event) {
      $uibModalInstance.dismiss('cancel');
  });
*/
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $ctrl.createAccount = function(){
    $uibModalInstance.close($ctrl);
    $state.go('signUp')
  }
});