angular.module('MyApp')
.controller('FriendsListController', ['$scope',  '$uibModal', '$http','$state', 'ModalFactory','user', function($scope,  $uibModal, $http, $state, ModalFactory,user){
  var $ctrl = this;
  $ctrl.user = user.data;
  if (!$ctrl.user){
    $state.go('landing');
  }else {
    $ctrl.friendsList = [];
    $http.post('/api/friend/list', {'userId': $ctrl.user._id}).then(function(res){
      $ctrl.friendsList = res.data;
      var userID = $ctrl.user._id;
      var friendsList = [];

      for (var i = 0; i < $ctrl.friendsList.length; i++) {
        if ($ctrl.friendsList[i].useridaccept._id == userID) {
          friendsList.splice(i, 1, $ctrl.friendsList[i].useridinvite);
        } else {
          friendsList.splice(i, 1, $ctrl.friendsList[i].useridaccept);
        }
      }
      $ctrl.friendsList = friendsList;
    });
  }

  $ctrl.deleteFriend = function(id){
    var params = {'friendId': id, 'userId': $ctrl.user._id}
      $http.post('/api/friend/deleteFriend', params).then(function(res){
      $ctrl.friendData = res.data;
      if ($ctrl.friendData.deleted == true) {
        $state.reload();
      }
    });
  };

  $http.post('/api/friend/listFriendsRequests',{userId: $ctrl.user._id}).then(function(res,err){
    $ctrl.listRequest = res.data;
  })

  $ctrl.accept = function(id){
    $http.post('/api/friend/accept',{'_id': id }).then(function(res){
      $http.post('/api/friend/listFriendsRequests',{userId: $ctrl.user._id}).then(function(res,err){
        $ctrl.listRequest = res.data;
      })
    });
  }

/*  function for add friend by button

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
  }*/

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