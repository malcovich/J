(function(){
	angular.module('MyApp', ['ui.router', 'ui.bootstrap', 'ngFileUpload'])
		.config(function($stateProvider){
			$stateProvider
				.state('landing', {
					url: "/",
					templateUrl: "/public/landing/landing.html",
					controller: "LandingController",
					controllerAs: '$ctrl'
				})
				.state('main', {
					url: "/main",
					templateUrl: "/public/views/home.html",
					controller: "MainCtrl"
				})
				.state('main.profile', {
					url: "/profile",
					templateUrl: "/public/profile/profile.html",
					controller: "ProfileCtrl",
					controllerAs: '$ctrl'
				})
				.state('signUp', {
					url: "/signup",
					templateUrl: "/public/signup/signup.html",
					controller: "SignUpController",
					controllerAs: '$ctrl'
				})
				.state('main.contacts', {
					url: "/contacts",
					templateUrl: "/public/contacts/list.html",
					controller: "ContactsListController",
					controllerAs: '$ctrl'
				})
				.state('main.contact', {
					url: "/contacts/:id",
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
				.state('main.worker', {
					url: "/worker",
					templateUrl: "/public/workers/worker.html",
					controller: "WorkerController",
					controllerAs: '$ctrl'
				})
				.state('main.workerAdmin', {
					url: "/admin",
					templateUrl: "/public/workers/admin.html",
					controller: "WorkerAdminController",
					controllerAs: '$ctrl'
				})
				.state('main.messages', {
					url: "/messages",
					templateUrl: "/public/messages/list.html",
					controller: "MessagesController",
					controllerAs: '$ctrl'
				})
				.state('main.message', {
					url: "/messages/:id",
					templateUrl: "/public/messages/item.html",
					controller: "MessageController",
					controllerAs: '$ctrl'
				})
				.state('main.search', {
					url: "/search?q",
					templateUrl: "/public/search/results.html",
					controller: "searchController",
					controllerAs: '$ctrl'
				})
		})
}());
angular.module('MyApp')
  .controller('ContactDetailsController', ['$scope', '$http', '$stateParams', '$log','ModalFactory', function($scope, $http, $stateParams, $log, ModalFactory){
	var $ctrl = this;
	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));
	var originalId = $stateParams.id;
    $ctrl.showHideAddCommentBlock = false;
	$http.post('/api/contact/item', {'_id': $stateParams.id, 'userId': $ctrl.user._id }).then(function(res){
        
        if (res.data.contact.verifyContact){
            $ctrl.contactVerifyed = true;
        	$ctrl.contact = res.data.contact.verifyContact
        }
        else {
        	$ctrl.contact = res.data.contact;
        }
        $ctrl.verifyContacts = res.data.hypothesis;
        $http.post('/api/contact/commentsList', {id:$ctrl.contact._id}).then(function(res){
            $ctrl.comments = res.data;
        })
        $http.post('/api/contact/raitingList', {id:$ctrl.contact._id}).then(function(res){
            $ctrl.raitingList = res.data;
            var totalRaiting = 0;
            $ctrl.raitingList.forEach(function(raiting){
                totalRaiting += raiting.raiting;
                if (raiting.userId._id == $ctrl.user._id){
                    $ctrl.yourRaiting = raiting.raiting;
                }
            });
            $ctrl.raiting = totalRaiting/ $ctrl.raitingList.length;
            if ($ctrl.raiting >= 4){
                $ctrl.rColor = '#38B248';
            }else if($ctrl.raiting >= 3 && $ctrl.raiting < 4){
                $ctrl.rColor = '#f7981c';
            }
        })
    });

    $ctrl.replaceWithVerify = function(id){
    	$http.post('/api/contact/verifyContact', {'id': originalId,'verifyId': id, 'userId' : $ctrl.user._id}).then(function(res){
    		console.log('!')
    	})
    };

    $ctrl.addComment = function() {
        $ctrl.comment.contactId = $ctrl.contact._id;
        $ctrl.comment.userId = $ctrl.user._id;
        $ctrl.comment.date = new Date();
        $http.post('/api/contact/addComment', $ctrl.comment).then(function(res){

        })
    }

    $ctrl.saveRaiting = function(){
        $ctrl.newRaiting.contactId = $ctrl.contact._id;
        $ctrl.newRaiting.userId = $ctrl.user._id;
        $ctrl.newRaiting.date = new Date();
        $http.post('/api/contact/addRaiting', $ctrl.newRaiting).then(function(res){

        })
    }

    $ctrl.opentMessageModal = function(){
        ModalFactory.open('myModalContent.html', 'ModalInstanceCtrl').then(function(ctrl){
            console.log(ctrl)
            var message = {
                "userId" : $ctrl.user._id,
                "contactId" : $ctrl.contact._id,
                "message" :{
                    "text" : ctrl.text,
                    "date" : new Date(),
                    "author" : $ctrl.user._id
                }
            }
            $http.post('/api/messages/addMessage', message).then(function(res){

            });
        }, function () {
              console.info('Modal dismissed at: ' + new Date());
        });
    }

}]);

angular.module('MyApp')
  .controller('ContactsListController', ['$scope', '$log', 'UserFactory', '$uibModal', '$http','$state','ModalFactory', function($scope, $log, UserFactory, $uibModal, $http, $state, ModalFactory){
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
	    ModalFactory.open('myModalContent.html', 'ModalInstanceCtrl').then(function(ctrl){
	    	console.log(ctrl)
	      	$ctrl.contact = ctrl.contact;
	     	$ctrl.contact.userId = $ctrl.user._id;
	    	$http.post('/api/contact/add', $ctrl.contact).then(function(res){
	      		$ctrl.contactsList.push(res)
	      	});
		}, function () {
		    console.info('Modal dismissed at: ' + new Date());
		});
	};
}]);
angular.module('MyApp')
  .controller('MainCtrl', ['$scope', '$log', 'UserFactory', function($scope, $log, UserFactory) {
    $scope.user = JSON.parse(localStorage.getItem('User-Data'));
}]);
angular.module('MyApp').controller('ModalInstanceEditRequestCtrl',  function ($uibModalInstance, request) {
  var $ctrl = this;
  $ctrl.request = request;
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
angular.module('MyApp').controller('ModalInstanceRequestCtrl',  function ($uibModalInstance, contacts) {
  var $ctrl = this;
  $ctrl.contacts = contacts;
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
angular.module('MyApp').controller('ModalInstanceCtrl',  function ($uibModalInstance) {
  var $ctrl = this;
  // $ctrl.contacts = contacts;
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
  		$state.go('landing');
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
  .controller('LandingController', ['$scope', '$http', '$stateParams', '$log','$state', 'ModalFactory','UserFactory', function($scope, $http, $stateParams, $log, $state,ModalFactory,UserFactory){
  	var user = JSON.parse(localStorage.getItem('User-Data'));
  	var $ctrl = this;
  	 
	  if (user){
  		$state.go('main');
  	}else {
  		$ctrl.open = function(){
  			ModalFactory.open('login.html', 'ModalInstanceCtrl1').then(function(ctrl){
				$http.post('api/user/login', ctrl.login).then(function(res){
          res.data.user.type = res.data.type;
					localStorage.setItem('User-Data', JSON.stringify(res.data.user));
					UserFactory.setUser(res.data.user);
					$scope.$broadcast('userLogined');
					$scope.user = res.data.user;
          if (res.data.type == "Woker"){
            $state.go("main.worker",{'id':res.data.user._id});
          }else{
            $state.go('main');
          }
				}, function(err){
					console.log(err)
				})

		    }, function () {
		      console.info('Modal dismissed at: ' + new Date());
		    });
  		}
  	}
}]);
angular.module('MyApp')
  .controller('MessageController', ['$scope', '$http', '$stateParams', '$log','$state', 'ModalFactory','UserFactory', function($scope, $http, $stateParams, $log, $state,ModalFactory,UserFactory){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));

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
        	console.log(res)
        	$ctrl.message.list = res.data.list;
        	$ctrl.newMessage = '';
        });
        }
  	}
  
}]);
angular.module('MyApp')
  .controller('MessagesController', ['$scope', '$http', '$stateParams', '$log','$state', 'ModalFactory','UserFactory', function($scope, $http, $stateParams, $log, $state,ModalFactory,UserFactory){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));

  	$http.post('/api/messages/list', {'id': $ctrl.user._id}).then(function(res){
  		$ctrl.messages = res.data;
  	});
  
}]);
(function(){
	angular.module('MyApp')
		.controller('NavigationController', ['$scope','$http','$state', 'UserFactory',  function($scope, $http, $state, UserFactory){

			$scope.user = JSON.parse(localStorage.getItem('User-Data'));

			$scope.logUserOut = function(){
				localStorage.removeItem('User-Data');
				UserFactory.setUser(undefined);
				$scope.user = undefined
				$scope.$broadcast('userLogout');
				$state.go('landing');
			}
		}])
}())
angular.module('MyApp')
  .controller('RequestController', ['$scope', '$log', 'UserFactory', '$uibModal', '$http', '$stateParams', 'ModalFactory', function($scope, $log, UserFactory, $uibModal, $http, $stateParams,ModalFactory){
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
      console.log($ctrl.allContatcts)
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
  .controller('RequestsListController', ['$scope', 'UserFactory', '$http', '$stateParams','$state','ModalFactory', function($scope, UserFactory, $http, $stateParams, $state,ModalFactory){
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



angular.module('MyApp')
  .controller('ProfileCtrl', ['$scope', '$log', 'UserFactory', '$uibModal', '$http','$state','ModalFactory','Upload', function($scope, $log, UserFactory, $uibModal, $http, $state, ModalFactory,Upload){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));
  	$ctrl.copyUser = angular.copy($ctrl.user);

  	if (!$ctrl.user){
  		$state.go('main');
  	}else {
     $scope.$watch(function(){
          return $ctrl.file;
      }, function(){
          $ctrl.upload($scope.file)
      })

  		$ctrl.updateUser  =  function(){
  			$http.post('/api/user/updateProfile', $ctrl.copyUser).then(function(res){
          res.data.type = $ctrl.copyUser.type;
          console.log(res.data)
  				localStorage.setItem('User-Data', JSON.stringify(res.data));
          $ctrl.user = res.data;
  				$ctrl.change = false;
  			})
  		}
	  }

     $ctrl.upload = function(file){
                if($ctrl.file){
                    Upload.upload({
                        url: '/api/user/addPhoto',
                        method :'POST',
                        data: {'id': $ctrl.user._id},
                        file: $ctrl.file
                    }).success(function(data){
                      console.log(data)
                        // $scope.newPredefined.img = data.img
                    }).error(function(error){
                        console.log(error)
                    })
                }
            };
}]);

     
(function(){
	angular.module('MyApp')
		.controller('searchController', ['$scope', '$state', '$http','$stateParams', function($scope, $state, $http,$stateParams){
			console.log($stateParams.q)
			$scope.goToSearch = function(){
				$state.go('main.search', {'q': $scope.query})
			}

			if($stateParams.q != undefined){
				$http.post('/api/search',{'q': $stateParams.q}).then(function(res){
					console.log('res',res)
				})
			}
		}])
}())
(function(){
	angular.module('MyApp')
		.controller('SignUpController', ['$scope', '$state', '$http', function($scope, $state, $http){
			var $ctrl = this
			$ctrl.showCustomer = true;
			var url  = 'api/user/signup';
			 $ctrl.createUser = function(){
				$http({
					method :'POST', 
					url : url,
					data :  $ctrl.newUser
				}).then(function(res){
					console.log(res)
				},function(error){
					console.log(error)
				});
			}

			 $ctrl.createContact = function(){
				$http({
					method :'POST', 
					url : 'api/contact/signup',
					data :  $ctrl.newContact
				}).then(function(res){
					$state.go('main.worker')
				},function(error){
					console.log(error)
				});
			}
		}])
}())
angular.module('MyApp')
  .controller('WorkerAdminController', ['$scope', '$log', 'UserFactory', '$http', '$state', 'ModalFactory', function($scope, $log, UserFactory, $http, $state, ModalFactory){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));

  	$http.post('/api/contact/itemFull', {'_id': $ctrl.user._id }).then(function(res){
        $ctrl.contact = res.data[0];
    });

  	if (!$ctrl.user){
  		$state.go('main');
  	}else {
  		
	}

}]);
angular.module('MyApp')
  .controller('WorkerController', ['$scope', '$log', 'UserFactory', '$http', '$state', 'ModalFactory', function($scope, $log, UserFactory, $http, $state, ModalFactory){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));
  	console.log($ctrl.user)
  	if (!$ctrl.user){
  		$state.go('main');
  	}else {
  		$ctrl.contactsList = [];
		$http.post('/api/contact/list', {'userId': $ctrl.user._id}).then(function(res){
	      	$ctrl.contactsList = res.data;
	    });
	}

    $ctrl.open = function (size) {
	    ModalFactory.open('myModalContent.html', 'ModalInstanceCtrl').then(function(ctrl){
	    	console.log(ctrl)
	      	$ctrl.contact = ctrl.contact;
	     	$ctrl.contact.userId = $ctrl.user._id;
	    	$http.post('/api/contact/add', $ctrl.contact).then(function(res){
	      		$ctrl.contactsList.push(res)
	      	});
		}, function () {
		    console.info('Modal dismissed at: ' + new Date());
		});
	};
}]);
angular.module('MyApp').factory('ModalFactory', function($uibModal) {
	var service = {};
	service.user = localStorage.getItem('User-Data');

	service.open =  function (template, controller, resolve = {}, windowSize = 'sm', parentSelector) {
        var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var options = {
            templateUrl: template,
            controller: controller,
            controllerAs: 'vm',
            windowClass : "login",
            appendTo: parentElem
        };

        return $uibModal.open(options).result;
    };

    service.openRequestModal = function(template, controller, contacts){
        var options = {
            templateUrl: template,
            controller: controller,
            controllerAs: 'vm',
            backdrop: 'static',
            resolve: {
                contacts : function(){
                    return contacts
                }
            }
        }
        return $uibModal.open(options).result;
    }

    service.editRequest = function(template, controller, request){
        var options = {
            templateUrl: template,
            controller: controller,
            controllerAs: 'vm',
            backdrop: 'static',
            resolve: {
                request : function(){
                    return request
                }
            }
        }
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