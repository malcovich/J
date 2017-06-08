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
        $http.post('/api/contact/commentsList', {id:$ctrl.contact._id}).then(function(res){
            $ctrl.comments = res.data;
        })
        $http.post('/api/contact/raitingList', {id:$ctrl.contact._id}).then(function(res){
            $ctrl.raitingList = res.data;
            var totalRaiting = 0;
            $ctrl.raitingList.forEach(function(raiting){
                totalRaiting += raiting.raiting;
            });
            $ctrl.raiting = totalRaiting/ $ctrl.raitingList.length;
        })
    });

    $ctrl.replaceWithVerify = function(id){
    	$http.post('/api/contact/verifyContact', {'id': originalId,'verifyId': id, 'userId' : $ctrl.user._id}).then(function(res){
    		console.log('!')
    	})
    };

    $ctrl.addComment = function() {
        $ctrl.comment.contactId = $ctrl.contact._id;
        $ctrl.comment.userId = $ctrl.user._id;
        $ctrl.comment.date = new Date();
        $http.post('/api/contact/addComment', $ctrl.comment).then(function(res){

        })
    }

    $ctrl.saveRaiting = function(){
        $ctrl.newRaiting.contactId = $ctrl.contact._id;
        $ctrl.newRaiting.userId = $ctrl.user._id;
        $ctrl.newRaiting.date = new Date();
        $http.post('/api/contact/addRaiting', $ctrl.newRaiting).then(function(res){

        })
    }

}]);
