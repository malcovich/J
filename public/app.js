(function(){
	angular.module('MyApp', ['ui.router', 'ui.bootstrap', 'ngFileUpload','ngStorage',])
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
			          	user: function (AuthFactory) {
			                return AuthFactory.me().then(function(user){
			               		return user.data;
			               	});
			          	}
			        },
					
				})
				.state('main.feed', {
					url: "/feed",
					templateUrl: "/public/views/feed.html",
					resolve: {
						checkAuth : function(user){
							return user;
						}
					},
					controller: "FeedCtrl"
				})
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
	                    	console.log(response)
	                        $location.path('/login');
	                    }
	                    return $q.reject(response);
	                }
	            };
	        }]);
		})
}());