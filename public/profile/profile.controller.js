angular.module('MyApp')
  .controller('ProfileCtrl', ['$rootScope','$scope', '$log', 'user', '$uibModal', '$http','$state','ModalFactory','Upload', function($rootScope,$scope, $log, user, $uibModal, $http, $state, ModalFactory,Upload){
  	var $ctrl = this;
  
    $ctrl.cropper = {};
    $ctrl.cropper.sourceImage = null;
    $ctrl.cropper.croppedImage   = null;
    $ctrl.bounds = {};
    $ctrl.bounds.left = 1;
    $ctrl.bounds.top = 1;

    $ctrl.isShowedBlock = false;

      $ctrl.user = user.data;
      $ctrl.copyUser = angular.copy($ctrl.user);
      user.croped = $ctrl.cropper.croppedImage;

      if (!$ctrl.user ){
        $state.go('main');
      } else {
        if ($ctrl.user.bounds){
            $ctrl.cropper.sourceImage = $ctrl.user.img;
            $ctrl.bounds = $ctrl.user.bounds;
        }

        $scope.$watch(function(){
            return $ctrl.file;
        }, function(){
            $ctrl.upload($ctrl.file);
        

        });

        $scope.$watch(function(){
            return $ctrl.bounds;
        }, function(){
            // $ctrl.uploadBounds($ctrl.bounds);
            console.log($ctrl.bounds)
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

        $ctrl.uploadBounds = function() {
          $http.post("/api/user/uploadBounds", {bounds: $ctrl.bounds, id: $ctrl.user._id, imgName : $ctrl.user.imgName, imgPath : $ctrl.user.img})
        }

        $ctrl.connectFB = function(){
          FB.login(function(response) {
            if (response.authResponse) {
                FB.api('/me', {fields: 'id,name,picture,about, birthday,cover, first_name, education,gender, hometown, interested_in,  last_name, location, relationship_status, work'}, function(response) {
                  $ctrl.user.fbId = response.id;
                  $http.post('/api/user/updateProfile', $ctrl.user).then(function(res){

                  })
                });
            } else {
               console.log('User cancelled login or did not fully authorize.');
            }
          });
        }

        $ctrl.upload = function(file){
          if($ctrl.file){
            Upload.upload({
              url: '/api/user/addPhoto',
              method :'POST',
              data: {'id': $ctrl.user._id, 'bounds' : {} , imgName: $ctrl.user.imgName},
              file: $ctrl.file,
              headers: {enctype:'multipart/form-data',  'Content-Type': $ctrl.file.type}
            }).success(function(data){
              $ctrl.user = data;
              $rootScope.$emit('changeProfile', {user: $ctrl.user })
              $ctrl.cropper.sourceImage = data.img;
              if (data.bounds != null ){
                $ctrl.bounds = data.bounds;
              }else {
                 $ctrl.bounds = {}
              }
              console.log($ctrl.bounds)
            }).error(function(error){
              console.log(error)
            });
          }
        };
      };
}]);

     