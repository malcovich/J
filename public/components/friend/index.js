angular.module('MyApp').component('friendItem', {
  templateUrl: '/public/components/friend/index.html',
  bindings: {
    friend: '=',
    user: '=',
    userFriends: '=',
    listRequest: '='
  },
  controller: function($http, $stateParams, FriendFactory){
    $ctrl = this;

    $ctrl.$onInit = function() {
      friendId = $ctrl.friend._id;
      $ctrl.showHideAddFriend();
    };

    $ctrl.showHideAddFriend = function(){
      setIsShowed(true);
      setIsRequested(false);

      if($ctrl.userFriends.indexOf(friendId) == -1 ){
        if (friendId == $ctrl.user._id) {
          setIsShowed(false);
        }
      }else{
        setIsShowed(false);
      }
      $ctrl.listRequest.forEach(function(request){
        if((request.useridinvite && (request.useridinvite._id == friendId))|| (request.useridaccept && (request.useridaccept._id == friendId))){
          setIsRequested(true);
        }
      });
    };

    $ctrl.addToFriend = function(){
      var data = {
        useridinvite: $ctrl.user._id,
        useridaccept: friendId,
        accepted: false,
        deleted: false,
        sendreq: true
      };
      FriendFactory.addToFriend(data).then(function(res){
        setIsShowed(false);
        setIsRequested(true);
      });
    };

    function setIsShowed(bool){
      $ctrl.friend.isShowed = bool
    };

    function setIsRequested(bool){
      $ctrl.friend.isRequest = bool;
    };
  }
});