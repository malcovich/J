angular.module('MyApp')
  .controller('MainCtrl', ['$scope', '$log', 'UserFactory', function($scope, $log, UserFactory) {
    $scope.user = JSON.parse(localStorage.getItem('User-Data'));
}]);