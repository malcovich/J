angular.module('MyApp')
  .controller('CalendarController', ['$scope', 'user', '$uibModal', '$http','$state','$stateParams','ModalFactory', function($scope, user, $uibModal, $http, $state, $stateParams, ModalFactory){
  	var $ctrl = this;

  	init();

	function init() {
   	    $ctrl.user = user.data;

   	    $http.post('/api/contact/item', {'_id': $ctrl.user.linked_contact}).then(function(res, err){
            $ctrl.contact = res.data[0];
            createTableHeader();
            createTimeTable();
           
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
			if (yesterdayIndex == 0) {yesterdayIndex = 7};
			var numberDate = new Date(yesterday).getUTCDate();
			var numberMounth = new Date(yesterday).getUTCMonth();
			$ctrl.headerArray[yesterdayIndex-1] = {title : arrayDays[yesterdayIndex-1]+', '+ numberDate + ' '+ arrayMounth[numberMounth],date: new Date(yesterday)};
		}

		var numberCurrentMounth = new Date().getUTCMonth();
		var numberCurrentDate = new Date().getUTCDate();

		$ctrl.headerArray[$ctrl.currentDay - 1] = {title: arrayDays[$ctrl.currentDay - 1]+', '+ numberCurrentDate + ' '+ arrayMounth[numberCurrentMounth],date : new Date()};
		$ctrl.headerArray[$ctrl.currentDay - 1].current = true;
		for (var i = 1; i <= (7 - $ctrl.currentDay); i++){
			var nextday = new Date().getTime() + 1000 * 60 * 60 * 24 * i;
			var nextdayIndex = new Date(nextday).getDay();
			if (nextdayIndex == 0){ nextdayIndex = 7};
			var numberDate = new Date(nextday).getUTCDate();
			var numberMounth = new Date(nextday).getUTCMonth();
			$ctrl.headerArray[nextdayIndex-1] = {title: arrayDays[nextdayIndex-1]+', '+ numberDate + ' '+ arrayMounth[numberMounth], date : new Date(nextday)};
		}
	}

	createTimeTable =  function () {
		var startTimeContact = $ctrl.contact.working_days_by_contacts[0].startTime; 
		var endTimeContact = $ctrl.contact.working_days_by_contacts[0].endTime; 
		var startHourContact = new Date(startTimeContact).getHours();
		var startMinutesContact = new Date(startTimeContact).getMinutes();
		var endHourContact = new Date(endTimeContact).getHours();
		var endMinutesContact = new Date(endTimeContact).getMinutes();
		
		$ctrl.tableTime = {
			startTime : startHourContact,
			startTimeMinute : startMinutesContact,
			endTime : endHourContact,
			endTimeMinute : endMinutesContact,
			arrayHours : []
		}
		for (var s = $ctrl.tableTime.startTime; s <= $ctrl.tableTime.endTime; ++s){
			$ctrl.tableTime.arrayHours.push(s)
		}
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

