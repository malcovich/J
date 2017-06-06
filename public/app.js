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
				.state('main.worker', {
					url: "/",
					templateUrl: "/public/worker/main.html",
					controller: "WorkerController",
					controllerAs: '$ctrl'
				})
		})
}());