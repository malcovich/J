angular.module('MyApp').factory('EventFactory', function($http) {
	var service = {};

	service.save = function(event){
		return $http.post('/api/event/save', event);
	}

	service.getList = function(contactId){
		return $http.post('/api/event/getList', {contactId :contactId})
	}

	return service;
}) 