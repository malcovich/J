angular.module('MyApp').factory('FriendFactory', function($http) {
	var service = {};

	service.addToFriend = function(obj){
		return $http.post('/api/friend/add', obj);
	}

	service.getListFriends = function(obj){
		return $http.post('/api/friend/list', obj);
	}

	service.getListFriendsRequests = function(obj){
		$http.post('/api/friend/listFriendsRequests', obj)
	}
	service.getListSendedRequests = function(obj){
		$http.post('/api/friend/listSendedRequests', obj)
	}

	return service;
}) 