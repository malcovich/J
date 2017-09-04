angular.module('MyApp')
  .controller('CalendarController', ['$scope', 'user', '$uibModal', '$http','$state','$stateParams','ModalFactory', function($scope, user, $uibModal, $http, $state, $stateParams, ModalFactory){
  	var $ctrl = this;

  	init();

	function init() {
   	    $ctrl.user = user.data;

   	    $http.post('/api/contact/item', {'_id': $ctrl.user.linked_contact}).then(function(res, err){
            $ctrl.contact = res.data[0];
            createTableHeader();
           
        });
	};

	$ctrl.loadCategories = function () {
		$http.post('/api/categories/list', {'userId': $ctrl.user._id}).then(function(res){
		    $ctrl.listCategories = res.data;
		});
	}

	createTableHeader = function () {
		var arrayDays = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
		var arrayMounth = ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпня','Вересень','Жовтень','Листопад','Грудень']
		$ctrl.headerArray = [];
		$ctrl.currentDay = new Date().getDay();
		if ($ctrl.currentDay == 0) $ctrl.currentDay = 7;

		var date = new Date();
		for (var i = 1; i <= (-1*(1-$ctrl.currentDay)); i++){
			var yesterday = date - 1000 * 60 * 60 * 24 * i;
			var yesterdayIndex = new Date(yesterday).getDay();
			if ($ctrl.yesterdayIndex == 0) $ctrl.yesterdayIndex = 7;
			var numberDate = new Date(yesterday).getUTCDate();
			var numberMounth = new Date(yesterday).getUTCMonth();
			$ctrl.headerArray[new Date(yesterday).getDay()-1] = arrayDays[new Date(yesterday).getDay()-1]+', '+ numberDate + ' '+ arrayMounth[numberMounth];
		}
		var numberCurrentMounth = new Date().getUTCMonth();
		var numberCurrentDate = new Date().getUTCDate();
		$ctrl.headerArray[$ctrl.currentDay - 1] = arrayDays[$ctrl.currentDay - 1]+', '+ numberCurrentDate + ' '+ arrayMounth[numberCurrentMounth];
		for (var i = 1; i <= (1-$ctrl.currentDay); i++){
			var nextday = date - 1000 * 60 * 60 * 24 + i;
			var nextdayIndex = new Date(nextday).getDay();
			if ($ctrl.nextdayIndex == 0) $ctrl.nextdayIndex = 7;
			var numberDate = new Date(nextday).getUTCDate();
			var numberMounth = new Date(nextday).getUTCMonth();
			$ctrl.headerArray[new Date(nextday).getDay()-1] = arrayDays[new Date(nextday).getDay()-1]+', '+ numberDate + ' '+ arrayMounth[numberMounth];
		}
	}

	createTimeRows = function(){
		$ctrl.contact.working_days_by_contacts.startTime
	}

	$ctrl.save = function () {
		var obj = {
			'name' : $ctrl.contact.name,
			'spec' : $ctrl.contact.spec, 
			'description': $ctrl.contact.description,
			'category' : $ctrl.contact.category,
			'address' : $ctrl.contact.address
		};
		
		$http.post('/api/contact/updateInfoByContact',{'id' : $ctrl.contact._id, 'obj' : obj}).then(function(res, err){

		})
	}
}]);

