angular.module('MyApp')
  .controller('ProfileCtrl', ['$rootScope','$scope', '$log', 'user', '$uibModal', '$http','$state','ModalFactory','Upload', function($rootScope,$scope, $log, user, $uibModal, $http, $state, ModalFactory,Upload){
  	var $ctrl = this;

    $ctrl.cropper = {};
    $ctrl.cropper.sourceImage = null;
    $ctrl.cropper.croppedImage   = null;
    $ctrl.bounds = {};
    $ctrl.bounds.left = 0;
    $ctrl.bounds.right = 0;
    $ctrl.bounds.top = 0;
    $ctrl.bounds.bottom = 0;

      $ctrl.user = user.data;
      $ctrl.copyUser = angular.copy($ctrl.user);

      if ( !$ctrl.user ){
        $state.go('main');
      } else {
        $scope.$watch(function(){
            return $ctrl.file;
        }, function(){
            $ctrl.upload($ctrl.cropper.croppedImage)
        })

        $ctrl.updateUser  =  function(){
          $http.post('/api/user/updateProfile', $ctrl.user).then(function(res){
            $ctrl.user = res.data;
            $ctrl.change = false;
            $rootScope.$emit('changeProfile', {user: $ctrl.user })
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
              $ctrl.user = data;
              $rootScope.$emit('changeProfile', {user: $ctrl.user })
              // $scope.newPredefined.img = data.img
            }).error(function(error){
              console.log(error)
            });
          }
        };
      };
}]);

     