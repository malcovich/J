angular.module('MyApp')
  .controller('MainCtrl', ['$scope', '$log', 'UserFactory','AuthFactory', function($scope, $log, UserFactory,AuthFactory) {
  		AuthFactory.me().then(function(res){
  			$scope.user = res.data.data;

  			
  		})
    
}]);