(function(){
	angular.module('MyApp', ['ui.router', 'ui.bootstrap'])
		.config(function($stateProvider){
			$stateProvider
				.state('main', {
					url: "/",
					templateUrl: "/public/views/home.html",
					controller: "MainCtrl"
				})
				.state('profile', {
					url: "/profile",
					templateUrl: "/public/profile/profile.html",
					controller: "ProfileCtrl",
					controllerAs: '$ctrl'
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
				.state('contact', {
					url: "/contacts/details",
					templateUrl: "/public/contacts/contact-details.html",
					controller: "ContactDetailsController",
					controllerAs: '$ctrl'
				})
				.state('friends', {
					url: "/friends",
					templateUrl: "/public/friends/list.html",
					controller: "FriendsListController",
					controllerAs: '$ctrl'
				})
				.state('friend', {
					url: "/friends/:id",
					templateUrl: "/public/friends/item.html",
					controller: "FriendController",
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
				.state('worker', {
					url: "/worker/:id",
					templateUrl: "/public/workers/worker.html",
					controller: "WorkerController",
					controllerAs: '$ctrl'
				})
				.state('workerAdmin', {
					url: "/admin",
					templateUrl: "/public/workers/admin.html",
					controller: "WorkerAdminController",
					controllerAs: '$ctrl'
				})
		})
}());