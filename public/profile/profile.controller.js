angular.module('MyApp')
  .controller('ProfileCtrl', ['$scope', '$log', 'UserFactory', '$uibModal', '$http','$state','ModalFactory','Upload', function($scope, $log, UserFactory, $uibModal, $http, $state, ModalFactory,Upload){
  	var $ctrl = this;
  	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));
  	$ctrl.copyUser = angular.copy($ctrl.user);

  	if (!$ctrl.user){
  		$state.go('main');
  	}else {
     $scope.$watch(function(){
          return $ctrl.file;
      }, function(){
          $ctrl.upload($scope.file)
      })

  		$ctrl.updateUser  =  function(){
  			$http.post('/api/user/updateProfile', $ctrl.copyUser).then(function(res){
          res.data.type = $ctrl.copyUser.type;
          console.log(res.data)
  				localStorage.setItem('User-Data', JSON.stringify(res.data));
          $ctrl.user = res.data;
  				$ctrl.change = false;
  			})
  		}
	  }

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
                    })
                }
            };
}]);

     