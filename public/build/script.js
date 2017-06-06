(function(){
	angular.module('MyApp', ['ui.router', 'ui.bootstrap'])
		.config(function($stateProvider){
			$stateProvider
				.state('main', {
					url: "/main",
					templateUrl: "/public/views/home.html",
					controller: "MainCtrl"
				})
				.state('main.signUp', {
					url: "/signup",
					templateUrl: "/public/signup/signup.html",
					controller: "SignUpController"
				})
				.state('main.contacts', {
					url: "/contacts",
					templateUrl: "/public/contacts/list.html",
					controller: "ContactsListController",
					controllerAs: '$ctrl'
				})
				.state('main.contact', {
					url: "/contacts/details",
					templateUrl: "/public/contacts/contact-details.html",
					controller: "ContactDetailsController",
					controllerAs: '$ctrl'
				})
				.state('main.friends', {
					url: "/friends",
					templateUrl: "/public/friends/list.html",
					controller: "FriendsListController",
					controllerAs: '$ctrl'
				})
				.state('main.friend', {
					url: "/friends/:id",
					templateUrl: "/public/friends/item.html",
					controller: "FriendController",
					controllerAs: '$ctrl'
				})
				.state('main.requests', {
					url: "/requests",
					templateUrl: "/public/requests/list.html",
					controller: "RequestsListController",
					controllerAs: '$ctrl'
				})
				.state('main.request', {
					url: "/requests/:reqId",
					templateUrl: "/public/requests/request.html",
					controller: "RequestController",
					controllerAs: '$ctrl'
				})
				.state('landing', {
					url: "/",
					templateUrl: "/public/landing/landing.html",
					controller: "LandingController",
					controllerAs: '$ctrl'
				})
		})
}());
angular.module('MyApp')
  .controller('ContactDetailsController', ['$scope', '$http', '$stateParams', '$log', function($scope, $http, $stateParams, $log){
	var $ctrl = this;
	console.log('@')
	/*$ctrl.contact = {
		name: 'Test',
		surname: 'Testenko',
		id: 123,
	};*/

}]);

angular.module('MyApp')
  .controller('ContactsListController', ['$scope', '$log', 'UserFactory', '$uibModal', '$http','$state', function($scope, $log, UserFactory, $uibModal, $http, $state){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));

  	if (!$ctrl.user){
  		$state.go('main');
  	}else {
  		$ctrl.contactsList = [];

		$http.post('/api/contact/list', {'userId': $ctrl.user._id}).then(function(res){
	      	$ctrl.contactsList = res.data;
	    });
	}

    $ctrl.open = function (size) {
	    // var parentElem = parentSelector ? 
	    //   angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	    console.log('@')
	    var modalInstance = $uibModal.open({
	      animation: $ctrl.animationsEnabled,
	      ariaLabelledBy: 'modal-title',
	      ariaDescribedBy: 'modal-body',
	      templateUrl: 'myModalContent.html',
	      controller: 'ModalInstanceCtrl',
	      controllerAs: '$ctrl'
	    });

	    modalInstance.result.then(function (ctrl) {
	    	console.log(ctrl)
	      $ctrl.contact = ctrl.contact;
/*	    modalInstance.result.then(function (contact) {
	      $ctrl.contact = contact;
	      console.log($ctrl.contact)*/
	      $ctrl.contact.userId = $ctrl.user._id;
	     /* $ctrl.contact.userId = '59198f2dd114d349cc06d240';*/
	      console.log( $ctrl.contact)
	      $http.post('/api/contact/add', $ctrl.contact).then(function(res){
	      	console.log(res)
	      	$ctrl.contactsList.push(res)
	      });
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	};
	
}]);

angular.module('MyApp').controller('ModalInstanceCtrl', function ($uibModalInstance) {
  var $ctrl = this;
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
angular.module('MyApp')
  .controller('FriendsListController', ['$scope', 'UserFactory', '$uibModal', '$http','$state', 'ModalFactory', function($scope, UserFactory, $uibModal, $http, $state, ModalFactory){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));

  	if (!$ctrl.user){
  		$state.go('main');
  	}else {
  		$ctrl.friendsList = [];

		$http.post('/api/friend/list', {'userId': $ctrl.user._id}).then(function(res){
	      	$ctrl.friendsList = res.data;
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
}]);

angular.module('MyApp').controller('ModalInstanceCtrl1', function ($uibModalInstance) {
  var $ctrl = this;

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
angular.module('MyApp')
  .controller('FriendController', ['$scope', '$log', 'UserFactory', '$uibModal', '$http',  '$stateParams', function($scope, $log, UserFactory, $uibModal, $http, $stateParams){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));

	$http.post('/api/friend/item', { 'id': $stateParams.id}).then(function(res){
      	$ctrl.friend = res.data.friend[0];
      	$ctrl.constacts = res.data.contacts;
      	console.log($ctrl.friend, $ctrl.constacts)
      });
}]);


angular.module('MyApp')
  .controller('MainCtrl', ['$scope', '$log', 'UserFactory', function($scope, $log, UserFactory) {
    $scope.user = JSON.parse(localStorage.getItem('User-Data'));
 
}]);
angular.module('MyApp').controller('ModalInstanceCtrl',  function ($uibModalInstance,contacts) {
  var $ctrl = this;
  $ctrl.contacts = contacts;
  console.log('qfsdfs')
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
angular.module('MyApp')
  .controller('LandingController', ['$scope', '$http', '$stateParams', '$log','$state', function($scope, $http, $stateParams, $log,$state){
  	var user = JSON.parse(localStorage.getItem('User-Data'));
  	console.log(user)
	if (user){
  		$state.go('main');
  	}
	/*$ctrl.contact = {
		name: 'Test',
		surname: 'Testenko',
		id: 123,
	};*/

}]);

(function(){
	angular.module('MyApp')
		.controller('NavigationController', ['$scope','$http','$state', 'UserFactory',  function($scope, $http, $state, UserFactory){
				
			$scope.logUserIn = function(){
				$http.post('api/user/login', $scope.login).then(function(res){
					localStorage.setItem('User-Data', JSON.stringify(res.data));
					UserFactory.setUser(res.data);
					$scope.$broadcast('userLogined');
					$scope.user = res.data;
				}, function(err){
					console.log(err)
				})
			};

			$scope.user = JSON.parse(localStorage.getItem('User-Data'));

			$scope.logUserOut = function(){
				localStorage.removeItem('User-Data');
				UserFactory.setUser(undefined);
				$scope.user = undefined
				$scope.$broadcast('userLogout');
				$state.go('main');
			}
		}])
}())
(function(){
	angular.module('MyApp')
		.controller('SignUpController', ['$scope', '$state', '$http', function($scope, $state, $http){
			var url  = 'api/user/signup';
			$scope.createUser = function(){
				$http({
					method :'POST', 
					url : url,
					data : $scope.newUser
				}).then(function(res){
					console.log(res)
				},function(error){
					console.log(error)
				});
			}
		}])
}())
angular.module('MyApp')
  .controller('RequestController', ['$scope', '$log', 'UserFactory', '$uibModal', '$http', '$stateParams', function($scope, $log, UserFactory, $uibModal, $http, $stateParams){
  	var $ctrl = this;
    $ctrl.requestsList = [];
  	$ctrl.allRequests = [];
    /*id =591c7028ad30f137f06c8559*/

  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));

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
        $ctrl.allContatcts = res.data;
    });
    $http.post('/api/requests/getAnswer',  {'userId': $ctrl.user._id, 'reqId': $stateParams.reqId}).then(function(res){
        $ctrl.myAnswer = res.data;
        $ctrl.selectedContacts = res.data[0] ? res.data[0].contacts: [];
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
      var modalInstance = $uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        controllerAs: '$ctrl',
        size: size,
        resolve: {
          contacts: function () {
            return $ctrl.allContatcts;
          }
        }
      });

      modalInstance.result.then(function (ctrl) {
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
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
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



angular.module('MyApp').factory('ModalFactory', function($uibModal) {
	var service = {};
	service.user = localStorage.getItem('User-Data');

	service.open =  function (template, controller, resolve = {}, windowSize = 'sm') {
        var options = {
            templateUrl: template,
            controller: controller,
            controllerAs: 'vm',
            resolve,
            backdrop: 'static',
            keyboard: false,
        };

        return $uibModal.open(options).result;
    }

  	return service;
});
/*
return this._$uibModal.open({
            template: createItemTemplate,
            controller: createItemController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            windowClass: 'modal-sm',
            resolve: {
                itemModel: () => itemModel || null,
                entityName: () => entityName,
                saveFunction: () => saveFunction    // required to return promise
            }
        }).result;*/
angular.module('MyApp').factory('UserFactory', function() {
	var service = {};
	service.user = localStorage.getItem('User-Data');

	service.setUser = function(user){
		this.user = user;
	};

	service.getUser = function(){
		return JSON.parse(this.user);
	};
	
  	return service;
});