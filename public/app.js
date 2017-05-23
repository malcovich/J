(function(){
	angular.module('MyApp', ['ui.router', 'ui.bootstrap'])
		.config(function($stateProvider){
			$stateProvider
				.state('main', {
					url: "/",
					templateUrl: "/public/views/home.html",
					controller: "MainCtrl"
				})
				.state('signUp', {
					url: "/signup",
					templateUrl: "/public/signup/signup.html",
					controller: "SignUpController"
				})
				.state('contacts', {
					url: "/contacts",
					templateUrl: "/public/contacts/list.html",
					controller: "ContactsListController",
					controllerAs: '$ctrl'
				})
				.state('friends', {
					url: "/friends",
					templateUrl: "/public/friends/list.html",
					controller: "FriendsListController",
					controllerAs: '$ctrl'
				})
				.state('requests', {
					url: "/requests",
					templateUrl: "/public/requests/list.html",
					controller: "RequestsListController",
					controllerAs: '$ctrl'
				})
				.state('request', {
					url: "/requests/:reqId",
					templateUrl: "/public/requests/request.html",
					controller: "RequestController",
					controllerAs: '$ctrl'
				})
		})
}());