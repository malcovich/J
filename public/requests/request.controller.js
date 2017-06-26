angular.module('MyApp')
  .controller('RequestController', ['$scope', '$log', 'AuthFactory', '$uibModal', '$http', '$stateParams', 'ModalFactory', function($scope, $log, AuthFactory, $uibModal, $http, $stateParams,ModalFactory){
  	var $ctrl = this;
    $ctrl.requestsList = [];
  	$ctrl.allRequests = [];
    /*id =591c7028ad30f137f06c8559*/

  	AuthFactory.me().then(function(res){
      $ctrl.user = res.data.data;

      $http.post('/api/requests/item', {'userId': $ctrl.user._id, 'reqId': $stateParams.reqId}).then(function(res){
          $ctrl.request = res.data[0];
          if($ctrl.user._id == $ctrl.request.userId){
            $http.post('/api/requests/getAllAnswers', {'reqId': $stateParams.reqId}).then(function(res){
                $ctrl.allAnswers = res.data;
                console.log($ctrl.allAnswers)
            }); 
          }
      });

      $http.post('/api/contact/all',  {'userId': $ctrl.user._id, 'reqId': $stateParams.reqId}).then(function(res){
            $ctrl.data = res.data;
            $ctrl.allContatcts = [];
            console.log(res.data)
            for(i in $ctrl.data){
              console.log('sdfdsf',i, $ctrl.data[i][0].userId[0].name)
              var friend = $ctrl.data[i][0].userId[0].name
              if ($ctrl.data[i][0].userId[0]._id == $ctrl.user._id){
                 $ctrl.allContatcts.push({title: 'Ваши професионалы', contacts : $ctrl.data[i]})
              }
              else {
                $ctrl.allContatcts.push({friend: $ctrl.data[i]})
              }
            }
            console.log($ctrl.allContatcts)
              
      });
      $http.post('/api/requests/getAnswer',  {'userId': $ctrl.user._id, 'reqId': $stateParams.reqId}).then(function(res){
          $ctrl.myAnswer = res.data;
          $ctrl.selectedContacts = res.data[0] ? res.data[0].contacts: [];
          $ctrl.selectedContacts.forEach(function(contact){
            $ctrl.allContatcts[contact.userId].forEach(function(selected){
              if (selected._id == contact._id){
                selected.selected = true;
              } 
            })
          })
          console.log($ctrl.selectedContacts)
      });


      /*$http.post('/api/request/all', {'userId': $ctrl.user._id}).then(function(res){
        $ctrl.allRequests =  res.data;
      })*/
    	$ctrl.save = function(){
  /*   		$ctrl.request.userId = '5914c111bef45904e0478f1a';*/
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
          for(friend in ctrl.contacts){
            ctrl.contacts[friend].forEach(function(contact){
              if(contact.selected){
                $ctrl.selectedContacts.push(contact)
                contactsId.push(contact._id)
              };
            });
          };
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
    });
	
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