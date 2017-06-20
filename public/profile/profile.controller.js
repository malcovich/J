angular.module('MyApp')
  .controller('ProfileCtrl', ['$scope', '$log', 'AuthFactory', '$uibModal', '$http','$state','ModalFactory','Upload', function($scope, $log, AuthFactory, $uibModal, $http, $state, ModalFactory,Upload){
  	var $ctrl = this;

    AuthFactory.me().then(function(res){
      $ctrl.user = res.data.data;
      $ctrl.copyUser = angular.copy($ctrl.user);

      if ( !$ctrl.user ){
        $state.go('main');
      } else {
        $scope.$watch(function(){
            return $ctrl.file;
        }, function(){
            $ctrl.upload($scope.file)
        })

        $ctrl.updateUser  =  function(){
          $http.post('/api/user/updateProfile', $ctrl.copyUser).then(function(res){
            $ctrl.user = res.data;
            $ctrl.change = false;
          });
        };

        $ctrl.upload = function(file){
          if($ctrl.file){
            Upload.upload({
              url: '/api/user/addPhoto',
              method :'POST',
              data: {'id': $ctrl.user._id},
              file: $ctrl.file
            }).success(function(data){
              console.log(data)
              // $scope.newPredefined.img = data.img
            }).error(function(error){
              console.log(error)
            });
          }
        };
      };
    });
}]);

     