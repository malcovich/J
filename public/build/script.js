(function(){
	angular.module('MyApp', ['ui.router', 'ui.bootstrap', 'ngFileUpload','ngStorage','angular-img-cropper','angular-input-stars','switcher'])
		.config(function($stateProvider, $httpProvider){
			$stateProvider
				.state('landing', {
					url: "/",
					templateUrl: "/public/landing/landing.html",
					controller: "LandingController",
					controllerAs: '$ctrl'
				})
				.state('main', {
					url: "/main",
					templateUrl:  "/public/views/home.html",
					abstract: true,
					controller: "MainCtrl",
					resolve: {
			          	user: ['AuthFactory', function (AuthFactory) {
			                return AuthFactory.me().then(function(user,err){
			               		return user.data;
			               	});
			          	}]
			        },
					
				})
				// .state('main.feed', {
				// 	url: "/feed",
				// 	templateUrl: "/public/views/feed.html",
				// 	resolve: {
				// 		checkAuth : function(user){
				// 			return user;
				// 		}
				// 	},
				// 	controller: "FeedCtrl"
				// })
				.state('main.profile', {
					url: "/profile",
					templateUrl: "/public/profile/profile.html",
					resolve: {
						checkAuth : function(user){
							return user.data.data
						}
					},
					controller: "ProfileCtrl",
					controllerAs: '$ctrl'
				})
				.state('signUp', {
					url: "/signup",
					templateUrl: "/public/signup/signup.html",

					controller: "SignUpController",
					controllerAs: '$ctrl'
				})
				.state('login', {
					url: "/login",
					templateUrl: "/public/login/login.html",
					controller: "LandingController",
					controllerAs: '$ctrl'
				})
				.state('main.categories', {
					url: "/categories",
					templateUrl: "/public/category/list.html",
					resolve: {
						checkAuth : function(user){
							return user.data.data
						}
					},
					controller: "CategoryListController",
					controllerAs: '$ctrl'
				})
				.state('main.category', {
					url: "/categories/:id",
					templateUrl: "/public/category/item.html",
					resolve: {
						checkAuth : function(user){
							return user.data.data
						}
					},
					controller: "CategoryController",
					controllerAs: '$ctrl'
				})
				.state('main.contacts', {
					url: "/contacts",
					templateUrl: "/public/contacts/list.html",
					resolve: {
						checkAuth : function(user){
							return user.data.data
						}
					},
					controller: "ContactsListController",
					controllerAs: '$ctrl'
				})

				.state('main.contact', {
					url: "/contacts/:id",
					templateUrl: "/public/contacts/contact-details.html",
					resolve: {
						checkAuth : function(user){
							return user.data.data
						}
					},
					controller: "ContactDetailsController",
					controllerAs: '$ctrl'
				})
				.state('main.friends', {
					url: "/friends",
					templateUrl: "/public/friends/list.html",
					resolve: {
						checkAuth : function(user){
							return user.data.data
						}
					},
					controller: "FriendsListController",
					controllerAs: '$ctrl'
				})
				.state('main.friend', {
					url: "/friends/:id",
					templateUrl: "/public/friends/item.html",
					resolve: {
						checkAuth : function(user){
							return user.data.data
						}
					},
					controller: "FriendController",
					controllerAs: '$ctrl'
				})
				.state('main.requests', {
					url: "/requests",
					templateUrl: "/public/requests/list.html",
					resolve: {
						checkAuth : function(user){
							return user.data.data
						}
					},
					controller: "RequestsListController",
					controllerAs: '$ctrl'
				})
				.state('main.request', {
					url: "/requests/:reqId",
					templateUrl: "/public/requests/request.html",
					resolve: {
						checkAuth : function(user){
							return user.data.data
						}
					},
					controller: "RequestController",
					controllerAs: '$ctrl'
				})
				.state('main.worker', {
					url: "",
					templateUrl: "/public/workers_part/workers_main/main.html",
					resolve: {
						checkAuth : function(user){
							return user.data.data
						}
					},
					controller: "WorkersMainController",
					controllerAs: '$ctrl'
				})
				.state('main.workerProfile', {
					url: "/information",
					templateUrl: "/public/workers_part/profile/index.html",
					resolve: {
						checkAuth : function(user){
							return user.data.data
						}
					},
					controller: "WorkersProfileController",
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
					resolve: {
						checkAuth : function(user){
							return user.data.data
						}
					},
					controller: "MessagesController",
					controllerAs: '$ctrl'
				})
				.state('main.message', {
					url: "/messages/:id",
					templateUrl: "/public/messages/item.html",
					resolve: {
						checkAuth : function(user){
							return user.data.data
						}
					},
					controller: "MessageController",
					controllerAs: '$ctrl'
				})
				.state('main.search', {
					url: "/search?q",
					templateUrl: "/public/search/results.html",
					resolve: {
						checkAuth : function(user){
							return user.data.data
						}
					},
					controller: "searchController",
					controllerAs: '$ctrl'
				})

			$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
	            return {
	                'request': function (config) {
	                    config.headers = config.headers || {};
	                    if ($localStorage.token) {
	                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
	                    }
	                    return config;
	                },
	                'responseError': function(response) {
	                    if(response.status === 401 || response.status === 403) {
	                        $location.path('/login');
	                    }
	                    return $q.reject(response);
	                }
	            };
	        }]);
		})
}());

 window.fbAsyncInit = function() {
    FB.init({
      appId            : '488406961536075',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.10'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
angular.module('MyApp')
  .controller('CategoryController', ['$scope', '$log', 'user', '$uibModal', '$http','$state','$stateParams','ModalFactory', function($scope, $log, user, $uibModal, $http, $state, $stateParams, ModalFactory){
  	var $ctrl = this;
    $ctrl.user = user.data;
    $ctrl.r = 4;
  	if (!$ctrl.user){
  		$state.go('main');
  	}else {
  		$ctrl.category = [];
		$http.post('/api/categories/item', {'userId': $ctrl.user._id, 'id': $stateParams.id}).then(function(res){
	    $ctrl.category = res.data;
	  });

	    $ctrl.addContact = function(){
	    	$ctrl.listCategories = [];
	    	$ctrl.contactsList = []
	    	$http.post('/api/categories/list', {'userId': $ctrl.user._id}).then(function(res){
		      $ctrl.listCategories = res.data;

			    ModalFactory.openAddContactModal('addContact.html', 'addContact', $ctrl.listCategories, $ctrl.category.category).then(function(ctrl){
            $ctrl.contact = ctrl.contact;
            $ctrl.contact.userId = [$ctrl.user._id];
            $ctrl.contact.raiting = 0;
				    $ctrl.contact.userCreated = true;
				    $http.post('/api/contact/add', $ctrl.contact).then(function(res){
                console.log($ctrl.category.contacts)
			      		$ctrl.category.contacts.push(res.data)
			      	});
				    }, function () {
				    console.info('Modal dismissed at: ' + new Date());
				  });
			  });
		  }
		}

    $ctrl.changeHiddenStatus = function(contact){
      $http.post("/api/contact/changeHiddenStatus", {id: contact._id, hidden: !contact.hidden })
    }
}]);

angular.module('MyApp').controller('addContact', function ($uibModalInstance, $state, categories, selected) {
  var $ctrl = this;
  $ctrl.contact = {};
  $ctrl.categories = categories;

  $ctrl.categories.forEach(function(i,index){
  	if (i._id == selected._id){
  		$ctrl.selected = i;
  	};
  });

  $ctrl.contact.category = $ctrl.selected._id;
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
  .controller('CategoryListController', ['$scope', '$log', 'user', '$uibModal', '$http','$state','ModalFactory', function($scope, $log, user, $uibModal, $http, $state, ModalFactory){
  	var $ctrl = this;

    $ctrl.user = user.data;
  	$ctrl.categories = [];

  	if (!$ctrl.user){
  		$state.go('login');
  	}else {
		$http.post('/api/categories/list', {'userId': $ctrl.user._id}).then(function(res){
	      	$ctrl.categories = res.data;
	    });
	}

    $ctrl.open = function (size) {
	    ModalFactory.open('myModalContent.html', 'ModalInstanceCtrl').then(function(ctrl){
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
  .controller('ContactDetailsController', ['$scope', '$http', '$stateParams', '$log','ModalFactory','user', '$state', function($scope, $http, $stateParams, $log, ModalFactory,user, $state){
    var $ctrl = this;
    var yourRaiting = 0;
    var fullRaiting = 0;
    var originalId = $stateParams.id;

    $ctrl.user = user.data;
    $ctrl.showHideAddCommentBlock = false;

    var userName = $ctrl.user.name;
    var cotnactFilds = ['type_work_place', 'address', 'working_days']

     function setQuestion(){
              $ctrl.fildsWithOutAnswer = cotnactFilds.filter(function(item){
                if ($ctrl.contact[item] == undefined){
                  return item;
                }
              });
              $ctrl.selectedQuestion =  $ctrl.QBlock.filter(function(item){
                if (item.t == $ctrl.fildsWithOutAnswer[0]){
                  return item;
                }
              })
            }

    $ctrl.QBlock = [
      { 
        'url' :'/public/contacts/addres-type.html',
        't' : 'type_work_place',
        'q' : "Данный специалист работает в офисе или совершает выезды на дом?",
        'a' : [{title:"Только в офисе.",value:"Office"}, {title:"Только у клиента.", value : "client"},{title: "И в офисе и у клиента.", value:"both"}, {title: "К сожалению, я не знаю. ", value: "pass"}]
      },
      { 
        'url' :'/public/contacts/address.html',
        't' : 'address',
        'q' : "Знаете ли вы адресс данного специалиста?",
      },
      { 
        'url' :'/public/contacts/working-days.html',
        't' : 'working_days',
        'q' : "Знаете ли вы рабочие дни данного специалиста?",
      }
    ];
    $ctrl.saveAnswer = function(){
      if ( $ctrl.selectedQuestion[0].t == 'working_days'){
        $ctrl.userAnswer = $ctrl.firstday+'-'+ $ctrl.lastday;
      }
      var obj = {
        'userId': $ctrl.user._id,
        'contactId' : $stateParams.id,
        'fild' : $ctrl.selectedQuestion[0].t,
        'answer': $ctrl.userAnswer
      }

      $http.post('/api/contact/updateInfo', obj).then(function(res,err){
        $ctrl.contact = res.data;
        $ctrl.userAnswer = "";
        setQuestion();
      })
    }
    $scope.$watch('$ctrl.yourRaiting', function(newValue, oldValue, scope) {
        if((newValue !== undefined) && (oldValue != newValue) && (yourRaiting != newValue) ){
            $ctrl.saveRaiting(newValue);
        }
    });

    	$http.post('/api/contact/item', {'_id': $stateParams.id, 'userId': $ctrl.user._id }).then(function(res, err){
            $ctrl.contact = res.data;
            $ctrl.friendsHasContact = [];
            setQuestion();

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

              $ctrl.friendsList.forEach(function(friend){
                if ($ctrl.contact.userId.indexOf(friend._id) >= 0 ){
                    $ctrl.friendsHasContact.push(friend);
                }
              });
            });

            $ctrl.isWorkedInOfice = function (){
              if (($ctrl.contact.type_work_place == 'ofice') || ( $ctrl.contact.type_work_place == 'both')){
                return "Да"
              }else{
                if($ctrl.contact.type_work_place == 'client') {
                  return "Нет"
                }
                if ($ctrl.contact.type_work_place == 'pass') {
                  return "Не указано"
                }
              }
            };
            $ctrl.isWorkedInHome = function(){
              if (($ctrl.contact.type_work_place == 'client') || ( $ctrl.contact.type_work_place == 'both')){
                return "Да"
              }else{
                if($ctrl.contact.type_work_place == 'ofice') {
                  return "Нет"
                }
                if ($ctrl.contact.type_work_place == 'pass') {
                  return "Не указано"
                }
              }
            }

            $ctrl.isShowedRightBar = function(){
                return $ctrl.contact.userCreated && $ctrl.fildsWithOutAnswer.length>0
            }

            $http.post('/api/contact/commentsList', {id:$ctrl.contact._id}).then(function(res){
                $ctrl.comments = res.data;
            })

            $http.post('/api/contact/raitingList', {id:$ctrl.contact._id}).then(function(res){
                if (res.data) {
                    $ctrl.raitingList = res.data;
                }else {
                    $ctrl.raitingList = [];
                }
                var totalRaiting = 0;
                $ctrl.raitingList.forEach(function(raiting){
                    totalRaiting += raiting.raiting;
                    if (raiting.userId._id == $ctrl.user._id){
                        $ctrl.yourRaiting = raiting.raiting;
                        yourRaiting = raiting.raiting;
                    }
                });
                fullRaiting = {
                    raiting : totalRaiting,
                    count : $ctrl.raitingList.length
                }
                $ctrl.raiting = totalRaiting/ $ctrl.raitingList.length;
                if ($ctrl.raiting >= 4){
                    $ctrl.rColor = '#38B248';
                }else if($ctrl.raiting >= 3 && $ctrl.raiting < 4){
                    $ctrl.rColor = '#f7981c';
                }
            });

           

            $ctrl.saveRaiting = function(raiting){
                $ctrl.newRaiting = {};
                $ctrl.newRaiting.raiting = raiting;
                $ctrl.newRaiting.contactId = $ctrl.contact._id;
                $ctrl.newRaiting.userId = $ctrl.user._id;
                $ctrl.newRaiting.date = new Date();

                if (yourRaiting == 0){
                    $http.post('/api/contact/addRaiting', $ctrl.newRaiting).then(function(res){
                        var totalRaiting = 0;
                        $ctrl.raitingList.push(res.data);
                        $ctrl.raitingList.forEach(function(raiting){
                          totalRaiting += raiting.raiting;
                        });
                        $ctrl.raiting = totalRaiting/ $ctrl.raitingList.length;
                        $http.post('/api/contact/changeRaiting', {id : $ctrl.contact._id,  raiting : $ctrl.raiting}).then(function(res){
                        })
                    })
                }else {
                    $http.post('/api/contact/updateRaiting', $ctrl.newRaiting).then(function(res){
                        var totalRaiting = fullRaiting.raiting + res.data.raiting;
                        $ctrl.raiting = totalRaiting/ $ctrl.raitingList.length + 1;
                        $http.post('/api/contact/changeRaiting', {id : $ctrl.contact._id,  raiting : $ctrl.raiting}).then(function(res){

                        })
                    })
                }
            }
        });

        $ctrl.deleteContact = function(){
            $http.post('/api/contact/deleteExist', {'_id': $stateParams.id, 'userId': $ctrl.user._id }).then(function(){
                $state.go('main.category', {id : $ctrl.contact.category })
            })
        }


        // $ctrl.replaceWithVerify = function(id){
        // 	$http.post('/api/contact/verifyContact', {'id': originalId,'verifyId': id, 'userId' : $ctrl.user._id}).then(function(res){
        // 		console.log('!')
        // 	})
        // };

        $ctrl.addComment = function() {
            $ctrl.comment.contactId = $ctrl.contact._id;
            $ctrl.comment.userId = $ctrl.user._id;
            $ctrl.comment.date = new Date();
            $http.post('/api/contact/addComment', $ctrl.comment).then(function(res){

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
  .controller('ContactsListController', ['$scope', '$log', 'AuthFactory', '$uibModal', '$http','$state','ModalFactory', function($scope, $log, AuthFactory, $uibModal, $http, $state, ModalFactory){
  	var $ctrl = this;
  	AuthFactory.me().then(function(res){
        $ctrl.user = res.data.data;
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
		      	$ctrl.contact = ctrl.contact;
		     	$ctrl.contact.userId = $ctrl.user._id;
		    	$http.post('/api/contact/add', $ctrl.contact).then(function(res){
		      		$ctrl.contactsList.push(res)
		      	});
			}, function () {
			    console.info('Modal dismissed at: ' + new Date());
			});
		};
	});
}]);
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
angular.module('MyApp')
  .controller('FriendController', ['$scope', '$log', 'user', '$state','$uibModal', '$http',  '$stateParams', function($scope, $log, user, $state,$uibModal, $http, $stateParams){
  	var $ctrl = this;
        $ctrl.user = user.data;
		$http.post('/api/friend/item', {'friendId': $stateParams.id}).then(function(res){
	      	$ctrl.friendInfo = res.data;
	      	var userId =  $ctrl.user._id;
	      	var friendId = $ctrl.friendInfo.friend._id;
	      	var friends = [];
		    $ctrl.showHideAddContact();
		    $ctrl.listAlloverContact();

		    for (var i = 0; i < $ctrl.friendInfo.friends.length; i++) {
		        if ($ctrl.friendInfo.friends[i].useridaccept._id == friendId ) {
		          friends.splice(i, 1, $ctrl.friendInfo.friends[i].useridinvite);
		        } else {
		          friends.splice(i, 1, $ctrl.friendInfo.friends[i].useridaccept);
		        }
		    }
		    $ctrl.friendInfo.friends = friends;
	  

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
			      $ctrl.friendsList = friendsList.map(function(friend){
			      	return friend._id;
			      });
			    $http.post('/api/friend/listFriendsRequests',{userId: $ctrl.user._id}).then(function(res,err){
				   $ctrl.listRequest = res.data;
				   $http.post('/api/friend/listSendedRequests',{userId: $ctrl.user._id}).then(function(res,err){
				   		$ctrl.listRequest =[].concat(res.data,$ctrl.listRequest);
		      			$ctrl.showHideAddFriend();

				   })
				})

			});

	    	
  		});
    	$ctrl.deleteFriend = function(id){
    		var params = {'friendId': id, 'userId': $ctrl.user._id}

    		$http.post('/api/friend/deleteFriend', params).then(function(res){
    			$ctrl.friendData = res.data;

    			if ($ctrl.friendData.deleted == true) {
				  $state.go('main.friends');
    			}
	          console.log(res);
	        });
    	};

    	$ctrl.listAlloverContact = function(){
    		$http.post("/api/contact/getAlloverList",{userId: $ctrl.user._id, friendId : $stateParams.id}).then(function(res){
    			$ctrl.listAlloverContact = res.data;
    		})
    	}

    	$ctrl.addToFrined = function(friend){
		  var data = {
		    useridinvite: $ctrl.user._id,
		    useridaccept: friend._id,
		    accepted: false,
		    deleted: false,
		    sendreq: true
		  }
		  $http.post('/api/friend/add', data).then(function(res){
		  	friend.isShowed = false;
		  	friend.isRequest = true;
		  })
		}

		$ctrl.addToContacts = function(contact){
			var data = {'id':contact._id, 'userId' : $ctrl.user._id}
			$http.post('/api/contact/addExist', data).then(function(res){
				console.log(res)
			})
		}

		$ctrl.showHideAddContact = function(){
			$ctrl.friendInfo.contacts.forEach(function(contact){
				if(contact.userId.indexOf($ctrl.user._id) == -1 ){
					contact.isShowed = true;
				}else{
					contact.isShowed = false;
				}
			})
		}

		$ctrl.showHideAddFriend = function(){
			$ctrl.friendInfo.friends.forEach(function(friend){
				if($ctrl.friendsList.indexOf(friend._id) == -1 ){
					if (friend._id == $ctrl.user._id) {
						friend.isShowed = false;
					}else{ 
						friend.isShowed = true;
					}
				}else{
					friend.isShowed = false;
				}
				console.log(2, $ctrl.listRequest)
				$ctrl.listRequest.forEach(function(request){
					console.log(1,request)
					if((request.useridinvite._id == friend._id)|| (request.useridaccept._id == friend._id)){
						friend.isRequest = true;
					}
					else {
						friend.isRequest = false;
					}
				})
			})
		}

		
}]);


angular.module('MyApp')
  .controller('FeedCtrl', ['$scope', '$log',  '$http', 'user', function($scope, $log, $http, user) {
  			$scope.user = user.data;
  			$http.post('/api/friend/listFriendsRequests',{userId: $scope.user._id}).then(function(res,err){
  				$scope.listRequest = res.data;
  			})

  			$scope.accept = function(id){
  				$http.post('/api/friend/accept',{'_id': id }).then(function(res){

  				});
  			}
}]);
angular.module('MyApp')
  .controller('MainCtrl', ['$scope', '$log', '$http','user', function($scope, $log, $http, user) {
		$scope.user = user.data;

		$http.post('/api/friend/listFriendsRequests',{userId: $scope.user._id}).then(function(res){
			$scope.listRequest = res.data;
		});

		$scope.$on("setTitle",function (event, data) {
			$scope.title = data.title;
	});
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
  .controller('LandingController', ['$scope', '$http', '$stateParams','$state','ModalFactory','$rootScope', '$location', '$localStorage', 'AuthFactory', function($scope, $http, $stateParams, $state,ModalFactory,$rootScope ,$location,$localStorage, AuthFactory){
  	var $ctrl = this;
	  if ($localStorage.token){
  		$state.go('main');
  	}else {
  		$ctrl.login = function(){
        var formData = {
            email: this.login.email,
            password: this.login.password
          }

        AuthFactory.signin(formData).then(function(res){
          if (res.type == false) {
              alert(res.data)    
          } else {
            $localStorage.token = res.data.token;
            if (res.data.data.role == "customer"){
              $state.go("main.requests");    
            }else {
              $state.go("main.worker")
            }
          }
        })
		  };

      $ctrl.loginFB = function(){
        FB.login(function(response) {
          if (response.authResponse) {
            FB.api('/me', {fields: 'id,name,picture,about, birthday,cover, first_name, education,gender, hometown, interested_in,  last_name, location, relationship_status, work'}, function(response) {
                console.log( response);
            });
          } else {
           console.log('User cancelled login or did not fully authorize.');
          }
        });
      }
  	}
}]);
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
angular.module('MyApp')
  .controller('MessagesController', ['$scope', '$http', '$stateParams', '$log','$state', 'ModalFactory','user', function($scope, $http, $stateParams, $log, $state,ModalFactory,user){
  	var $ctrl = this;
  	
	$ctrl.user = user.data;
  	$http.post('/api/messages/list', {'id': $ctrl.user._id}).then(function(res){
  		$ctrl.messages = res.data;
  	});
  
}]);
(function(){
	angular.module('MyApp')
		.controller('NavigationController', ['$rootScope','$scope','$http','$state', 'AuthFactory',  function($rootScope, $scope, $http, $state, AuthFactory){
			AuthFactory.me().then(function(res){
	  			$scope.user = res.data.data;
	  		})
			$scope.logUserOut = function(){
				AuthFactory.logout();
			}
			$scope.goToSearch = function(){
				console.log('e',$scope.query)
				$state.go('main.search', {'q': $scope.query})
			}

			$rootScope.$on('changeProfile', function(event, data){
				$scope.user = data.user;
			})

		}])
}())
angular.module('MyApp')
  .controller('ProfileCtrl', ['$rootScope','$scope', '$log', 'user', '$uibModal', '$http','$state','ModalFactory','Upload', function($rootScope,$scope, $log, user, $uibModal, $http, $state, ModalFactory,Upload){
  	var $ctrl = this;
  
    $ctrl.cropper = {};
    $ctrl.cropper.sourceImage = null;
    $ctrl.cropper.croppedImage   = null;
    $ctrl.bounds = {};
    $ctrl.bounds.left = 1;
    $ctrl.bounds.top = 1;

    $ctrl.isShowedBlock = false;

      $ctrl.user = user.data;
      $ctrl.copyUser = angular.copy($ctrl.user);
      user.croped = $ctrl.cropper.croppedImage;

      if (!$ctrl.user ){
        $state.go('main');
      } else {
        if ($ctrl.user.bounds){
            $ctrl.cropper.sourceImage = $ctrl.user.img;
            $ctrl.bounds = $ctrl.user.bounds;
        }

        $scope.$watch(function(){
            return $ctrl.file;
        }, function(){
            $ctrl.upload($ctrl.file);
        

        });

        $scope.$watch(function(){
            return $ctrl.bounds;
        }, function(){
            // $ctrl.uploadBounds($ctrl.bounds);
            console.log($ctrl.bounds)
        });

        $ctrl.showBlock = function(){
          $ctrl.isShowedBlock = true;
        }

        $ctrl.updateUser  =  function(){
          $http.post('/api/user/updateProfile', $ctrl.user).then(function(res){
            $ctrl.user = res.data;
            $ctrl.change = false;
            $rootScope.$emit('changeProfile', {user: $ctrl.user })
          });
        };

        $ctrl.uploadBounds = function() {
          $http.post("/api/user/uploadBounds", {bounds: $ctrl.bounds, id: $ctrl.user._id, imgName : $ctrl.user.imgName, imgPath : $ctrl.user.img})
        }

        $ctrl.connectFB = function(){
          FB.login(function(response) {
            if (response.authResponse) {
                FB.api('/me', {fields: 'id,name,picture,about, birthday,cover, first_name, education,gender, hometown, interested_in,  last_name, location, relationship_status, work'}, function(response) {
                  $ctrl.user.fbId = response.id;
                  $http.post('/api/user/updateProfile', $ctrl.user).then(function(res){

                  })
                });
            } else {
               console.log('User cancelled login or did not fully authorize.');
            }
          });
        }

        $ctrl.upload = function(file){
          if($ctrl.file){
            Upload.upload({
              url: '/api/user/addPhoto',
              method :'POST',
              data: {'id': $ctrl.user._id, 'bounds' : {} , imgName: $ctrl.user.imgName},
              file: $ctrl.file,
              headers: {enctype:'multipart/form-data',  'Content-Type': $ctrl.file.type}
            }).success(function(data){
              $ctrl.user = data;
              $rootScope.$emit('changeProfile', {user: $ctrl.user })
              $ctrl.cropper.sourceImage = data.img;
              if (data.bounds != null ){
                $ctrl.bounds = data.bounds;
              }else {
                 $ctrl.bounds = {}
              }
              console.log($ctrl.bounds)
            }).error(function(error){
              console.log(error)
            });
          }
        };
      };
}]);

     
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
          console.log(res.data)
          $ctrl.myAnswer[0].contacts.forEach(function(contact){
            contact.category = $ctrl.categories.filter(function(item){
              if (item._id == contact.category) return item
            })
          })
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
  /*   		$ctrl.request.userId = '5914c111bef45904e0478f1a';*/
    		$ctrl.request.userId = $ctrl.user._id;
    		$ctrl.request.requestDate = new Date();
    		$http.post('/api/requests/add', $ctrl.request).then(function(res){
            var requestRes =  res.data.request
            requestRes.userId = res.data.user[0];
            console.log($ctrl.requestsList,requestRes)
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



(function(){
	angular.module('MyApp')
		.controller('SignUpController', ['$scope', '$state', '$http','$rootScope', '$location', '$localStorage', 'AuthFactory', function($scope, $state, $http,$rootScope, $location, $localStorage,AuthFactory){
			var $ctrl = this
			$ctrl.showCustomer = true;

			$ctrl.createUser = function(){
				var formData = {
	                email: this.newUser.email,
	                password: this.newUser.password,
	                name: this.newUser.name,
	                role : 'customer'
	            }
	            AuthFactory.save(formData).then(function(res) {
	            	if (res.data.type){
	            		$localStorage.token = res.data.token;
	                	$state.go('main.requests')
	            	}
	            })
			}

			$ctrl.createContact = function(){
				var formData = {
	                email: this.newContact.email,
	                password: this.newContact.password,
	                name: this.newContact.name,
	                role : 'worker'
	            }
	            AuthFactory.save(formData).then(function(res) {
	            	if (res.data.type){
	            		$localStorage.token = res.data.token;
	                	$state.go('main.requests')
	            	}
	            })
			}


			$ctrl.createFB = function(){
				FB.getLoginStatus(function(response) {
				  if (response.status === 'connected') {
				    // the user is logged in and has authenticated your
				    // app, and response.authResponse supplies
				    // the user's ID, a valid access token, a signed
				    // request, and the time the access token 
				    // and signed request each expire
				    var uid = response.authResponse.userID;
				    var accessToken = response.authResponse.accessToken;
				    var formData = {
				    	fbId : uid
				    }

				    AuthFactory.signin(formData).then(function(res){
        				$localStorage.token = res.data.token;
        				$state.go('main.requests')
        			});
        			
				  } else if (response.status === 'not_authorized') {
				    // the user is logged in to Facebook, 
				    // but has not authenticated your app
				    AuthFactory.save(formData).then(function(res) {
				            	if (res.data.type){
				            		$localStorage.token = res.data.token;
				                	$state.go('main.requests')
				            	}
				            })
				  } else {
				    // the user isn't logged in to Facebook.
				  }
			 	});
				FB.login(function(response) {
			        if (response.authResponse) {
			            FB.api('/me', {fields: 'id,name,picture,about, birthday,cover, first_name, education,gender, hometown, interested_in,  last_name, location, relationship_status, work'}, function(response) {
			            	console.log( response);
			            	var formData = {};
			            	formData.name = response.name;
			            	formData.email = response.email;
			            	formData.fbId = response.id;
			            	formData.role = 'customer'
			            	
			           	});
			        } else {
			           console.log('User cancelled login or did not fully authorize.');
			        }
		        });
			}
	}])
}())
(function(){
	angular.module('MyApp')
		.controller('searchController', ['$scope', '$state', '$http','$stateParams', 'user', function($scope, $state, $http,$stateParams, user){
			$ctrl = this;
      			$ctrl.user = user.data;

				if($stateParams.q != undefined){
					$ctrl.q = $stateParams.q;
					$http.post('/api/search',{'q': $stateParams.q}).then(function(res){
						$ctrl.searchResut = res.data;

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
						      $ctrl.friendsList = friendsList.map(function(friend){
						      	return friend._id;
						      });
						    $http.post('/api/friend/listFriendsRequests',{userId: $ctrl.user._id}).then(function(res,err){
							   $ctrl.listRequest = res.data;
							   $http.post('/api/friend/listSendedRequests',{userId: $ctrl.user._id}).then(function(res,err){
							   		$ctrl.listRequest =[].concat(res.data,$ctrl.listRequest);
					      			$ctrl.showHideAddFriend();

							   })
							})

						});

					})
				}

				$ctrl.showHideAddFriend = function(){
					$ctrl.searchResut.users.forEach(function(friend){
						if($ctrl.friendsList.indexOf(friend._id) == -1 ){
							console.log(friend, friend._id == $ctrl.user._id)
							if (friend._id == $ctrl.user._id) {
								friend.isShowed = false;
							}else{ 
								friend.isShowed = true;
							}
						}else{
							friend.isShowed = false;
						}
						console.log(2, $ctrl.listRequest)
						$ctrl.listRequest.forEach(function(request){
							console.log(1,request)
							if((request.useridinvite._id == friend._id)|| (request.useridaccept._id == friend._id)){
								friend.isRequest = true;
							}
							else {
								friend.isRequest = false;
							}
						})
						console.log(friend.isShowed)
					})
				}

				$ctrl.addToFrined = function(id){
					var data = {
						useridinvite: $ctrl.user._id,
						useridaccept: id,
						accepted: false,
						deleted: false,
						sendreq: true
					}
					$http.post('/api/friend/add', data).then(function(res){
						var request = res.data;
						if (request.accepted === false && request.sendreq === true) {
							console.log ("you just send request, button change to cancel request");
						} 
						if (request.accepted === true && request.sendreq === false) {
							console.log ("button its your friend");
						} 
						if (request.accepted === false && request.sendreq === false) {
							console.log ("button add to friend");
						}
						console.log(res)
					})
				}

				$ctrl.addToContacts = function(contact){
					var data = {'id':contact._id, 'userId' : $ctrl.user._id}
					$http.post('/api/contact/addExist', data).then(function(res){
						console.log(res)
					})
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
angular.module('MyApp').factory('AuthFactory', function($http, $localStorage, $state){
    var service = {};
    var baseUrl = "http://localhost:3000";
    function changeUser(user) {
        angular.extend(currentUser, user);
    }

    function urlBase64Decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }

    function getUserFromToken() {
        var token = $localStorage.token;
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        }
        return user;
    }
    function genericSuccess (res) {
      return res.data.data; // yes, really.
    }

    var currentUser = getUserFromToken();

    service.save = function(data, success, error) {
        return $http.post('/api/user/signup', data)
    },
    service.signin = function(data, success, error) {
        return  $http.post('/api/user/login', data)
    },
    service.me =  function(success, error) {
        return $http.get('/api/me/')
    },
    service.setUser = function(user){
        this.user = user;
    },
    service.getUser = function(){
        return this.user;
    }
    service.logout =  function(success) {
        changeUser({});
        delete $localStorage.token;
        $state.go('landing')
    }
    return service;
});
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

    service.openRequestModal = function(template, controller, contacts, size ){
        var options = {
            templateUrl: template,
            controller: controller,
            controllerAs: 'vm',
            size: size,
            backdrop: 'static',
            resolve: {
                contacts : function(){
                    return contacts
                }
            }
        }
        return $uibModal.open(options).result;
    }

    service.openAddContactModal = function(template, controller, categories, selected){
        console.log("service", categories)
        var options = {
            templateUrl: template,
            controller: controller,
            controllerAs: 'vm',
            backdrop: 'static',
            resolve: {
                categories : function(){
                    return categories
                },
                selected : function(){
                    return selected
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
angular.module('MyApp')
  .controller('WorkersMainController', ['$scope', 'user', '$uibModal', '$http','$state','$stateParams','ModalFactory', function($scope, user, $uibModal, $http, $state, $stateParams, ModalFactory){
  	var $ctrl = this;
    $ctrl.user = user.data;
    $ctrl.r = 4;
  	if (!$ctrl.user){
  		$state.go('main');
  	}else {
  		$ctrl.category = [];
		$http.post('/api/categories/item', {'userId': $ctrl.user._id, 'id': $stateParams.id}).then(function(res){
	    $ctrl.category = res.data;
	  });

	    $ctrl.addContact = function(){
	    	$ctrl.listCategories = [];
	    	$ctrl.contactsList = []
	    	$http.post('/api/categories/list', {'userId': $ctrl.user._id}).then(function(res){
		      $ctrl.listCategories = res.data;

			    ModalFactory.openAddContactModal('addContact.html', 'addContact', $ctrl.listCategories, $ctrl.category.category).then(function(ctrl){
            $ctrl.contact = ctrl.contact;
            $ctrl.contact.userId = [$ctrl.user._id];
            $ctrl.contact.raiting = 0;
				    $ctrl.contact.userCreated = true;
				    $http.post('/api/contact/add', $ctrl.contact).then(function(res){
                console.log($ctrl.category.contacts)
			      		$ctrl.category.contacts.push(res.data)
			      	});
				    }, function () {
				    console.info('Modal dismissed at: ' + new Date());
				  });
			  });
		  }
		}

    $ctrl.changeHiddenStatus = function(contact){
      $http.post("/api/contact/changeHiddenStatus", {id: contact._id, hidden: !contact.hidden })
    }
}]);


angular.module('MyApp')
  .controller('WorkersProfileController', ['$scope', 'user', '$uibModal', '$http','$state','$stateParams','ModalFactory', function($scope, user, $uibModal, $http, $state, $stateParams, ModalFactory){
  	var $ctrl = this;

  	init();

	function init() {
   	    $ctrl.user = user.data;

   	    $http.post('/api/contact/item', {'_id': $ctrl.user.linked_contact}).then(function(res, err){
            $ctrl.contact = res.data[0];
            $ctrl.copyContact = angular.copy($ctrl.contact);
            $ctrl.loadCategories();
        });
	};

	$ctrl.loadCategories = function(){
		$http.post('/api/categories/list', {'userId': $ctrl.user._id}).then(function(res){
		    $ctrl.listCategories = res.data;
		    console.log($ctrl.listCategories)
		});
	}

	$ctrl.save = function(){
		var obj = {
			'name' : $ctrl.contact.name,
			'spec' : $ctrl.contact.spec, 
			'description': $ctrl.contact.description,
			'category' : $ctrl.contact.category
		};
		
		$http.post('/api/contact/updateInfoByContact',{'id' : $ctrl.contact._id, 'obj' : obj}).then(function(res, err){

		})
	}
}]);

