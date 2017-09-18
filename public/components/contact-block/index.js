angular.module('MyApp').component('qblock', {
  templateUrl: '/public/components/contact-block/index.html',
  bindings: {
    contact: '=',
    user: '='
  },
  controller: function($http, $stateParams){
  	$ctrl = this;
    var cotnactFilds = ['type_work_place', 'address', 'working_days'];
    var QBlock = [
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

  	
  	$ctrl.$onInit = function() {
     setQuestion();
    };


    function setQuestion(){
      $ctrl.fildsWithOutAnswer = cotnactFilds.filter(function(item){
        if ($ctrl.contact[item] == undefined){
          return item;
        }
      });
      $ctrl.selectedQuestion =  QBlock.filter(function(item){
        if (item.t == $ctrl.fildsWithOutAnswer[0]){
          return item;
        }
      });
    

    }

    

    $ctrl.saveAnswer = function(type, userAnswer){
    	  console.log(userAnswer)
      if ( type == 'working_days'){
        $ctrl.userAnswer = $ctrl.firstday+'-'+ $ctrl.lastday;
      }
      var obj = {
        'userId': $ctrl.user._id,
        'contactId' : $stateParams.id,
        'fild' : type,
        'answer':userAnswer
      }

      $http.post('/api/contact/updateInfo', obj).then(function(res,err){
        $ctrl.contact = res.data;
        $ctrl.userAnswer = "";
        setQuestion();
      })
    }
  }
});