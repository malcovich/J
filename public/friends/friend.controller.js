angular.module('MyApp')
  .controller('FriendController', ['$scope', '$log', 'UserFactory', '$uibModal', '$http',  '$stateParams', function($scope, $log, UserFactory, $uibModal, $http, $stateParams){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));

	$http.post('/api/friend/item', { 'id': $stateParams.id}).then(function(res){
      	$ctrl.friend = res.data.friend[0];
      	$ctrl.constacts = res.data.contacts;
      	console.log($ctrl.friend, $ctrl.constacts)
      });
}]);

