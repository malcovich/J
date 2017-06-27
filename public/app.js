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
					templateUrl: "/public/views/home.html",
					controller: "MainCtrl"
				})
				.state('main.feed', {
					url: "/feed",
					templateUrl: "/public/views/feed.html",
					controller: "FeedCtrl"
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
				.state('login', {
					url: "/login",
					templateUrl: "/public/login/login.html",
					controller: "LandingController",
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