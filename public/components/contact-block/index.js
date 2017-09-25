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
        'q' : "Спеціаліст працює в офісе чи здійснює виїзди до клієнта?",
        'a' : [{title:"Тільки в офісі.",value:"Office"}, {title:"Тільки у клієнта.", value : "client"},{title: "І в офісі і у кліента.", value:"both"}, {title: "Я не знаю ", value: "pass"}]
      },
      { 
        'url' :'/public/contacts/address.html',
        't' : 'address',
        'q' : "Чи знаєте ви адресу спеціаліста?",
      },
      { 
        'url' :'/public/contacts/working-days.html',
        't' : 'working_days',
        'q' : "Чи знаєте ви рабочі дні даного спеціаліста?",
      }
    ];
  	
  	$ctrl.$onInit = function() {
      setQuestion();
    };

    function setQuestion(){
      findFildsWithOutAnswer();

      $ctrl.selectedQuestion =  QBlock.filter(function(item){
        if (item.t == $ctrl.fildsWithOutAnswer[0]){
          return item;
        }
      });

      console.log($ctrl.selectedQuestion)
    }

    function findFildsWithOutAnswer(){
      $ctrl.fildsWithOutAnswer = cotnactFilds.filter(function(item){
        if ($ctrl.contact[item] == undefined){
          return item;
        }
      });
    }

    $ctrl.saveAnswer = function(type, userAnswer){
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
        console.log(res)
        $ctrl.contact = res.data;
        $ctrl.userAnswer = "";
        setQuestion();
      })
    }
  }
});