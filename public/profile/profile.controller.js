angular.module('MyApp')
  .controller('ProfileCtrl', ['$rootScope','$scope', '$log', 'user', '$uibModal', '$http','$state','ModalFactory','Upload', function($rootScope,$scope, $log, user, $uibModal, $http, $state, ModalFactory,Upload){
  	var $ctrl = this;

    $ctrl.cropper = {};
    $ctrl.cropper.sourceImage = null;
    $ctrl.cropper.croppedImage   = null;
    $ctrl.bounds = {};
    $ctrl.bounds.left = 0;
    $ctrl.bounds.top = 0;

    $ctrl.isShowedBlock = false;

      $ctrl.user = user.data;
      $ctrl.copyUser = angular.copy($ctrl.user);

      if (!$ctrl.user ){
        $state.go('main');
      } else {
        if ($ctrl.user.bounds){
            $ctrl.cropper.sourceImage = $ctrl.user.img;
            $ctrl.bounds = $ctrl.user.bounds;
        }

        $scope.$watchGroup([function(){
            return $ctrl.file;
        }, function(){return $ctrl.bounds}], function(){
          console.log($ctrl.file, $ctrl.cropper.sourceImage)
            // $ctrl.upload($ctrl.file)
        });

        $ctrl.showBlock = function(){
          $ctrl.isShowedBlock = true;
        }

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
              data: {'id': $ctrl.user._id, 'bounds' : $ctrl.bounds},
              file: $ctrl.file
            }).success(function(data){
              console.log(data)
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

     