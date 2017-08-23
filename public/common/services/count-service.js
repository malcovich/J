angular.module('MyApp').factory('CountFactory', function($http) {
	var service = {};
	service.counterRequests  = 0;
	service.setCounterRequests = function(counter){
		service.counterRequests = counter;
	}
	service.getCounterRequests = function(){
		return service.counterRequests
	}

	return service;
}) 