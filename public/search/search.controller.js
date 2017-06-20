(function(){
	angular.module('MyApp')
		.controller('searchController', ['$scope', '$state', '$http','$stateParams', function($scope, $state, $http,$stateParams){
			$ctrl = this;
			
			if($stateParams.q != undefined){
				$ctrl.q = $stateParams.q;
				$http.post('/api/search',{'q': $stateParams.q}).then(function(res){
					$ctrl.searchResut = res.data;
				})
			}
		}])
}())