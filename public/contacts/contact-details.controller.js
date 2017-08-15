angular.module('MyApp')
  .controller('ContactDetailsController', ['$scope', '$http', '$stateParams', '$log','ModalFactory','user', '$state', function($scope, $http, $stateParams, $log, ModalFactory,user, $state){
    var $ctrl = this;
    var yourRaiting = 0;
    var fullRaiting = 0;
    var originalId = $stateParams.id;

    $ctrl.user = user.data;
    $ctrl.showHideAddCommentBlock = false;

    var userName = $ctrl.user.name;
    var cotnactFilds = ['type_work_place', 'address', 'working_days']

     function setQuestion(){
              $ctrl.fildsWithOutAnswer = cotnactFilds.filter(function(item){
                if ($ctrl.contact[item] == undefined){
                  return item;
                }
              });
              $ctrl.selectedQuestion =  $ctrl.QBlock.filter(function(item){
                if (item.t == $ctrl.fildsWithOutAnswer[0]){
                  return item;
                }
              })
            }

    $ctrl.QBlock = [
      { 
        'url' :'/public/contacts/addres-type.html',
        't' : 'type_work_place',
        'q' : "Данный специалист работает в офисе или совершает выезды на дом?",
        'a' : [{title:"Только в офисе.",value:"Office"}, {title:"Только у клиента.", value : "client"},{title: "И в офисе и у клиента.", value:"both"}, {title: "К сожалению, я не знаю. ", value: "pass"}]
      },
      { 
        'url' :'/public/contacts/address.html',
        't' : 'address',
        'q' : "Знаете ли вы адресс данного специалиста?",
      },
      { 
        'url' :'/public/contacts/working-days.html',
        't' : 'working_days',
        'q' : "Знаете ли вы рабочие дни данного специалиста?",
      }
    ];

    $ctrl.saveAnswer = function(){
      if ( $ctrl.selectedQuestion[0].t == 'working_days'){
        $ctrl.userAnswer = $ctrl.firstday+'-'+ $ctrl.lastday;
      }
      var obj = {
        'userId': $ctrl.user._id,
        'contactId' : $stateParams.id,
        'fild' : $ctrl.selectedQuestion[0].t,
        'answer': $ctrl.userAnswer
      }

      $http.post('/api/contact/updateInfo', obj).then(function(res,err){
        $ctrl.contact = res.data;
        $ctrl.userAnswer = "";
        setQuestion();
      })
    }

    $scope.$watch('$ctrl.yourRaiting', function(newValue, oldValue, scope) {
        if((newValue !== undefined) && (oldValue != newValue) && (yourRaiting != newValue) ){
            $ctrl.saveRaiting(newValue);
        }
    });

    	$http.post('/api/contact/item', {'_id': $stateParams.id, 'userId': $ctrl.user._id }).then(function(res, err){
            $ctrl.contact = res.data;
            $ctrl.friendsHasContact = [];
            setQuestion();

            $http.post('/api/friend/list', {'userId': $ctrl.user._id}).then(function(res){
              $ctrl.friendsList = res.data;
              var userID = $ctrl.user._id;

              var friendsList = [];

              for (var i = 0; i < $ctrl.friendsList.length; i++) {
                if ($ctrl.friendsList[i].useridaccept._id == userID) {
                  friendsList.splice(i, 1, $ctrl.friendsList[i].useridinvite);
                } else {
                  friendsList.splice(i, 1, $ctrl.friendsList[i].useridaccept);
                }
              }
              $ctrl.friendsList = friendsList;

              $ctrl.friendsList.forEach(function(friend){
                if ($ctrl.contact.userId.indexOf(friend._id) >= 0 ){
                    $ctrl.friendsHasContact.push(friend);
                }
              });
            });

            $ctrl.isWorkedInOfice = function (){
              if (($ctrl.contact.type_work_place == 'ofice') || ( $ctrl.contact.type_work_place == 'both')){
                return "Да"
              }else{
                if($ctrl.contact.type_work_place == 'client') {
                  return "Нет"
                }
                if ($ctrl.contact.type_work_place == 'pass') {
                  return "Не указано"
                }
              }
            };
            $ctrl.isWorkedInHome = function(){
              if (($ctrl.contact.type_work_place == 'client') || ( $ctrl.contact.type_work_place == 'both')){
                return "Да"
              }else{
                if($ctrl.contact.type_work_place == 'ofice') {
                  return "Нет"
                }
                if ($ctrl.contact.type_work_place == 'pass') {
                  return "Не указано"
                }
              }
            }

            $ctrl.isShowedRightBar = function(){
                return $ctrl.contact.userCreated && $ctrl.fildsWithOutAnswer.length>0
            }

            $http.post('/api/contact/commentsList', {id:$ctrl.contact._id}).then(function(res){
                $ctrl.comments = res.data;
            })

            $http.post('/api/contact/raitingList', {id:$ctrl.contact._id}).then(function(res){
                if (res.data) {
                    $ctrl.raitingList = res.data;
                }else {
                    $ctrl.raitingList = [];
                }
                var totalRaiting = 0;
                $ctrl.raitingList.forEach(function(raiting){
                    totalRaiting += raiting.raiting;
                    if (raiting.userId._id == $ctrl.user._id){
                        $ctrl.yourRaiting = raiting.raiting;
                        yourRaiting = raiting.raiting;
                    }
                });
                fullRaiting = {
                    raiting : totalRaiting,
                    count : $ctrl.raitingList.length
                }
                $ctrl.raiting = totalRaiting/ $ctrl.raitingList.length;
                if ($ctrl.raiting >= 4){
                    $ctrl.rColor = '#38B248';
                }else if($ctrl.raiting >= 3 && $ctrl.raiting < 4){
                    $ctrl.rColor = '#f7981c';
                }
            });

           

            $ctrl.saveRaiting = function(raiting){
                $ctrl.newRaiting = {};
                $ctrl.newRaiting.raiting = raiting;
                $ctrl.newRaiting.contactId = $ctrl.contact._id;
                $ctrl.newRaiting.userId = $ctrl.user._id;
                $ctrl.newRaiting.date = new Date();

                if (yourRaiting == 0){
                    $http.post('/api/contact/addRaiting', $ctrl.newRaiting).then(function(res){
                        var totalRaiting = 0;
                        $ctrl.raitingList.push(res.data);
                        $ctrl.raitingList.forEach(function(raiting){
                          totalRaiting += raiting.raiting;
                        });
                        $ctrl.raiting = totalRaiting/ $ctrl.raitingList.length;
                        $http.post('/api/contact/changeRaiting', {id : $ctrl.contact._id,  raiting : $ctrl.raiting}).then(function(res){
                        })
                    })
                }else {
                    $http.post('/api/contact/updateRaiting', $ctrl.newRaiting).then(function(res){
                        var totalRaiting = fullRaiting.raiting + res.data.raiting;
                        $ctrl.raiting = totalRaiting/ $ctrl.raitingList.length + 1;
                        $http.post('/api/contact/changeRaiting', {id : $ctrl.contact._id,  raiting : $ctrl.raiting}).then(function(res){

                        })
                    })
                }
            }
        });

        $ctrl.deleteContact = function(){
            $http.post('/api/contact/deleteExist', {'_id': $stateParams.id, 'userId': $ctrl.user._id }).then(function(){
                $state.go('main.category', {id : $ctrl.contact.category })
            })
        }


        // $ctrl.replaceWithVerify = function(id){
        // 	$http.post('/api/contact/verifyContact', {'id': originalId,'verifyId': id, 'userId' : $ctrl.user._id}).then(function(res){
        // 		console.log('!')
        // 	})
        // };

        $ctrl.addComment = function() {
            $ctrl.comment.contactId = $ctrl.contact._id;
            $ctrl.comment.userId = $ctrl.user._id;
            $ctrl.comment.date = new Date();
            $http.post('/api/contact/addComment', $ctrl.comment).then(function(res){

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
   
}]);
