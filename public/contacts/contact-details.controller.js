angular.module('MyApp')
  .controller('ContactDetailsController', ['$scope', '$http', '$stateParams', '$log', function($scope, $http, $stateParams, $log){
	var $ctrl = this;
	$ctrl.user = JSON.parse(localStorage.getItem('User-Data'));
	var originalId = $stateParams.id;
	$http.post('/api/contact/item', {'_id': $stateParams.id, 'userId': $ctrl.user._id }).then(function(res){
        
        if (res.data.contact.verifyContact){
        	$ctrl.contact = res.data.contact.verifyContact
        }
        else {
        	$ctrl.contact = res.data.contact;
        }
        $ctrl.verifyContacts = res.data.hypothesis;
    });

    $ctrl.replaceWithVerify = function(id){
    	$http.post('/api/contact/verifyContact', {'id': originalId,'verifyId': id, 'userId' : $ctrl.user._id}).then(function(res){
    		console.log('!')
    	})
    }

}]);
