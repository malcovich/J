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