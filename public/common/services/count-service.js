angular.module('MyApp').factory('CountFactory', function($http) {
	var service = {};

	service.setCounterRequests = function(counter){
		this.counterRequests = counter;
	}
	service.getCounterRequests = function(counter){
		this.counterRequests
	}

	return service;
}) 