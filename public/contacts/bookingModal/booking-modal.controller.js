angular.module('MyApp')
  .controller('BookingModalController', ['$scope', 'AuthFactory', '$uibModal', '$http','$state','ModalFactory','EventFactory', 'contact', 'user', 'item', function($scope,  AuthFactory, $uibModal, $http, $state, ModalFactory,EventFactory, contact, user, item){
  	var $ctrl = this;
  	AuthFactory.me().then(function(res){
  		$ctrl.contact = contact;
  		$ctrl.timeObj = item;
  		$ctrl.time =$ctrl.timeObj.time;
        $ctrl.user = res.data.data;
	  	if (!$ctrl.user){
	  		$state.go('main');
	  	}else {
	  		$ctrl.contactsList = [];
			$http.post('/api/contact/list', {'userId': $ctrl.user._id}).then(function(res){
		      	$ctrl.contactsList = res.data;
		    });
		}

		$ctrl.save = function(){
			console.log("32424")
			var event = {
				'coment' : $ctrl.coments,
				'userId' : $ctrl.user._id,
				'contactId' : $ctrl.contact._id,
				'time' : $ctrl.time,
				'date' : $ctrl.timeObj.day.date

			}
			EventFactory.save(event).then(function(){

			})
		}
	});
}]);