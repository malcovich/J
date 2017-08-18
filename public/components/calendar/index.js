angular.module('MyApp').component('calendar', {
  templateUrl: '/public/components/calendar/index.html',
  bindings: {
    contact: '=',
    user: '='
  },
  controller: function(ModalFactory,EventFactory ){
  	$ctrl = this;
  	
  	$ctrl.$onInit = function() {
      createTableHeader();
      createTimeTable();
      checkOwner();
      getEventsList();
    };

    checkOwner = function(){
    	if($ctrl.user.linked_contact == $ctrl.contact._id){
    		$ctrl.isOwner = true;
    	}else {
    		$ctrl.isOwner = false;
    	}
    }


    getEventsList = function(){
    	EventFactory.getList($ctrl.contact._id).then(function(list){
    		$ctrl.eventsList = list.data;
    	})
    }

    $ctrl.openModalBooking = function(item){
	    ModalFactory.openBookingModal('/public/contacts/bookingModal/bookingModal.html', 'BookingModalController', $ctrl.contact, item,  $ctrl.user).then(function(){

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
			$ctrl.headerArray[yesterdayIndex-1].pased = true;
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

		var hdiff = new Date($ctrl.contact.working_days_by_contacts[0].endTime).getTime() - new Date($ctrl.contact.working_days_by_contacts[0].startTime).getTime()
		
		var deltaHours = (hdiff/3600000).toFixed(2);
		var countPeriods = (deltaHours/$ctrl.contact.periodForClient).toFixed(0);

		/*if($ctrl.contact.fixedWorkingPeriod) {
			for (var s = 0; s <= countPeriods; s++){
				$ctrl.tableTime.arrayHours.push(s)
			}
		}*/
		
		$ctrl.tableTime = {
			startTime : startHourContact,
			startTimeMinute : startMinutesContact,
			endTime : endHourContact,
			endTimeMinute : endMinutesContact,
			arrayHours : []
		}
		for (var s = 0; s < countPeriods; s++){
			var i  = new Date(startTimeContact).getTime() + 3600000*s*$ctrl.contact.periodForClient;
			$ctrl.tableTime.arrayHours.push(new Date(i))
		}
	}
  }
});