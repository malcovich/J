(function(){
	angular.module('MyApp')
		.controller('searchController', ['$scope', '$state', '$http','$stateParams', function($scope, $state, $http,$stateParams){
			$scope.goToSearch = function(){
				$state.go('main.search', {'q': $scope.query})
			}
			if($stateParams.q != undefined){
				$http.post('/api/search',{'q': $stateParams.q}).then(function(res){
					console.log('res',res)
				})
			}
		}])
}())