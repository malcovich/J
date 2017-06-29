angular.module('MyApp')
  .controller('ContactDetailsController', ['$scope', '$http', '$stateParams', '$log','ModalFactory','AuthFactory', function($scope, $http, $stateParams, $log, ModalFactory,AuthFactory){
	var $ctrl = this;
	AuthFactory.me().then(function(res){
        $ctrl.user = res.data.data;
    	var originalId = $stateParams.id;
        $ctrl.showHideAddCommentBlock = false;
    	$http.post('/api/contact/item', {'_id': $stateParams.id, 'userId': $ctrl.user._id }).then(function(res){
            console.log(res.data)
            if (res.data[0].verifyContact){
                $ctrl.contactVerifyed = true;
            	$ctrl.contact = res.data.verifyContact
            }
            else {
            	$ctrl.contact = res.data[0];
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
                    if (raiting.userId._id == $ctrl.user._id){
                        $ctrl.yourRaiting = raiting.raiting;
                    }
                });
                $ctrl.raiting = totalRaiting/ $ctrl.raitingList.length;
                if ($ctrl.raiting >= 4){
                    $ctrl.rColor = '#38B248';
                }else if($ctrl.raiting >= 3 && $ctrl.raiting < 4){
                    $ctrl.rColor = '#f7981c';
                }
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

        $ctrl.opentMessageModal = function(){
            ModalFactory.open('myModalContent.html', 'ModalInstanceCtrl').then(function(ctrl){
                console.log(ctrl)
                var message = {
                    "userId" : $ctrl.user._id,
                    "contactId" : $ctrl.contact._id,
                    "message" :{
                        "text" : ctrl.text,
                        "date" : new Date(),
                        "author" : $ctrl.user._id
                    }
                }
                $http.post('/api/messages/addMessage', message).then(function(res){

                });
            }, function () {
                  console.info('Modal dismissed at: ' + new Date());
            });
        }
    });

}]);
