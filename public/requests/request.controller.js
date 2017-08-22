angular.module('MyApp')
  .controller('RequestController', ['$scope', '$state', 'user', '$uibModal', '$http', '$stateParams', 'ModalFactory', function($scope, $state, user, $uibModal, $http, $stateParams,ModalFactory){
  	var $ctrl = this;
    $ctrl.requestsList = [];
  	$ctrl.allRequests = [];
    /*id =591c7028ad30f137f06c8559*/

      $ctrl.user = user.data;
      $http.post('/api/categories/list').then(function(res){
        $ctrl.categories = res.data;
      })


      $http.post('/api/requests/item', {'userId': $ctrl.user._id, 'reqId': $stateParams.reqId}).then(function(res){
        $ctrl.request = res.data[0];
        if($ctrl.user._id == $ctrl.request.userId._id){

          $http.post('/api/requests/getAllAnswers', {'reqId': $stateParams.reqId}).then(function(res){
              $ctrl.allAnswers = res.data;
              $ctrl.allContatctsFromAnsers = [];
              $ctrl.allAnswers.forEach(function(answer){
                answer.contacts.forEach(function(contact){
                  contact.category = $ctrl.categories.filter(function(item){
                    if (item._id == contact.category) return item
                  })
                  $ctrl.allContatctsFromAnsers.push({
                    'user' :answer.userId,
                    'contact' : contact
                  });
                })
              })
          }); 
        }
      });


      $http.post('/api/contact/all',  {'userId': $ctrl.user._id, 'reqId': $stateParams.reqId}).then(function(res){
        $ctrl.allContatcts =  res.data;

        $http.post('/api/requests/getAnswer',  {'userId': $ctrl.user._id, 'reqId': $stateParams.reqId}).then(function(res){
          $ctrl.myAnswer = res.data;
          if ($ctrl.myAnswer.length > 0){
            $ctrl.myAnswer[0].contacts.forEach(function(contact){
              contact.category = $ctrl.categories.filter(function(item){
                if (item._id == contact.category) return item
              })
            })
          }
          console.log($ctrl.myAnswer)
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

      $ctrl.change = function(request){
        ModalFactory.editRequest('editRequest.html', 'ModalInstanceEditRequestCtrl', request).then(function(ctrl){
          $http.post('/api/requests/changeRequest', {requestId : ctrl.request._id, newText : ctrl.request.text}).then(function(request){
            $ctrl.request = request.data;
          })
        })
      };

      $ctrl.deleteRequest = function(id){
        $http.post('/api/requests/deleteRequest', {'requestId': id}).then(function(res){
          $state.go('main.requests')
        });
      };

      $ctrl.deleteSelected = function(index) {
        $ctrl.selectedContacts[index].selected = false;
        $ctrl.selectedContacts.splice(index,1);

        var contactsId = []

        $ctrl.selectedContacts.forEach(function(contact){
            contactsId.push(contact._id)
        });
          
        var answer = {
          'requestId': $stateParams.reqId,
          'userId': $ctrl.user._id,
          'contacts' :contactsId
        }

        $http.post('/api/requests/saveAnswer', answer).then(function(){
          console.log('Save');
        });
      }

    	$ctrl.openModalfromNet = function (size) {
        ModalFactory.openRequestModal('myModalContent.html', 'ModalInstanceRequestCtrl', $ctrl.allContatcts, 'lg').then(function(ctrl){
          $ctrl.selectedContacts = [];
          var contactsId = []

          ctrl.contacts.forEach(function(contact){
            if(contact.selected){
              $ctrl.selectedContacts.push(contact)
              contactsId.push(contact._id)
            };
          });

          var answer = {
            'requestId': $stateParams.reqId,
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