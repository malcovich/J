angular.module('MyApp')
  .controller('MessageController', ['$scope', '$http', '$stateParams', '$log','$state', 'ModalFactory','user', function($scope, $http, $stateParams, $log, $state,ModalFactory,user){
  	var $ctrl = this;
  	$ctrl.user = user.data;

  	$http.post('/api/messages/item', {'id': $stateParams.id}).then(function(res){
  		$ctrl.message = res.data;
  	});

  	$ctrl.postMessage = function(){
  		var message = {
            "userId" : $ctrl.user._id,
            "contactId" : $ctrl.message.contactId._id,
            "message" :{
                "text" : $ctrl.newMessage,
                "date" : new Date(),
                "author" : $ctrl.user._id
            }
        }
        if ($ctrl.newMessage){
        	$http.post('/api/messages/addMessage', message).then(function(res){
        	$ctrl.message.list = res.data.list;
        	$ctrl.newMessage = '';
        });
        }
  	}
  
}]);