angular.module('MyApp').factory('CountFactory', function($http) {
	var service = {};
	var counterRequests  = 0;
	service.setCounterRequests = function(counter){
		counterRequests = counter;
	}
	service.getCounterRequests = function(){
		return counterRequests
	}

	return service;
}) 