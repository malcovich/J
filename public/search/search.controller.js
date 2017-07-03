(function(){
	angular.module('MyApp')
		.controller('searchController', ['$scope', '$state', '$http','$stateParams', 'AuthFactory', function($scope, $state, $http,$stateParams, AuthFactory){
			$ctrl = this;
			AuthFactory.me().then(function(res){
      			$ctrl.user = res.data.data;

				if($stateParams.q != undefined){
					$ctrl.q = $stateParams.q;
					$http.post('/api/search',{'q': $stateParams.q}).then(function(res){
						$ctrl.searchResut = res.data;
						console.log(res.data)
					})
				}

				$ctrl.addToFrined = function(id){
					var data = {
						useridinvite: $ctrl.user._id,
						useridaccept: id,
						accepted: false
					}
					$http.post('/api/friend/add', data).then(function(res){
						console.log(res)
					})
				}

				$ctrl.addToContacts = function(contact){
					var data = {'id':contact._id, 'userId' : $ctrl.user._id}
					$http.post('/api/contact/addExist', data).then(function(res){
						console.log(res)
					})
				}
			})
		}])
}())