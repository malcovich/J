angular.module('MyApp')
  .controller('RequestController', ['$scope', '$log', 'user', '$uibModal', '$http', '$stateParams', 'ModalFactory', function($scope, $log, user, $uibModal, $http, $stateParams,ModalFactory){
  	var $ctrl = this;
    $ctrl.requestsList = [];
  	$ctrl.allRequests = [];
    /*id =591c7028ad30f137f06c8559*/

      $ctrl.user = user.data;

      $http.post('/api/requests/item', {'userId': $ctrl.user._id, 'reqId': $stateParams.reqId}).then(function(res){
        $ctrl.request = res.data[0];
        if($ctrl.user._id == $ctrl.request.userId){

          $http.post('/api/requests/getAllAnswers', {'reqId': $stateParams.reqId}).then(function(res){
              $ctrl.allAnswers = res.data;
          }); 
        }
      });

      $http.post('/api/contact/all',  {'userId': $ctrl.user._id, 'reqId': $stateParams.reqId}).then(function(res){
        $ctrl.allContatcts =  res.data;

        $http.post('/api/requests/getAnswer',  {'userId': $ctrl.user._id, 'reqId': $stateParams.reqId}).then(function(res){
          $ctrl.myAnswer = res.data;

          $ctrl.selectedContacts = res.data[0] ? res.data[0].contacts: [];

          $ctrl.selectedContacts.forEach(function(contact){
            $ctrl.allContatcts.forEach(function(selected){
              if (selected._id == contact._id){
                selected.selected = true;
              } 
            })
          })
        });
      });

    	$ctrl.save = function(){
    		$ctrl.request.userId = $ctrl.user._id;
    		$ctrl.request.requestDate = new Date();
    		$http.post('/api/requests/add', $ctrl.request).then(function(res){
  	      	$ctrl.requestsList.push(res)
  	    });
    	}

    	$ctrl.openModalfromNet = function (size) {
        ModalFactory.openRequestModal('myModalContent.html', 'ModalInstanceRequestCtrl', $ctrl.allContatcts).then(function(ctrl){
          $ctrl.selectedContacts = [];
          var contactsId = []

            ctrl.contacts.forEach(function(contact){
              if(contact.selected){
                $ctrl.selectedContacts.push(contact)
                contactsId.push(contact._id)
              };
            });
          var answer = {
            'reqId': $stateParams.reqId,
            'userId': $ctrl.user._id,
            'contacts' :contactsId
          }

             $http.post('/api/requests/saveAnswer', answer).then(function(){
              console.log('Save');
            });
        })
      };
	
}]);

angular.module('MyApp').controller('ModalInstanceCtrl',  function ($uibModalInstance,contacts) {
  var $ctrl = this;
  $ctrl.contacts = contacts;
  
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});