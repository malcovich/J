angular.module('MyApp').directive('userHour', function() {
  return {
    template: '',
    restrict: 'E',
    scope: {
        startTime: '=',
        duration: '@',
        day: '=',
        startDay: '@',
        endDay: '@',
        openModal : '=',
        tableTime: '=',
        eventsList: '=',
        user: '='
    },
    link: function(scope, elem, attrs) {
        var item = {
            time: scope.startTime,
            day : scope.day
        } 
    	calculateAreaBeforeStart();
    	calculateAreaAfterEnd();
    	calculateRestDays();
        calculatePasedDays();
        findEventByDate();

        elem.find('.working-hours').on('click',function(){
            scope.openModal(item)
        });

        function findEventByDate (){
            var events = scope.eventsList.filter(function(event){
                if ((new Date(event.time).getTime() == new Date(item.time).getTime()) && ((new Date(event.date).getUTCDate()== new Date(item.day.date).getUTCDate()) && (new Date(event.date).getUTCMonth() == new Date(item.day.date).getUTCMonth()))){
                    return event
                }
            })
            if((events.length > 0) && (events[0].userId._id == scope.user._id) && ((scope.day.pased == false) || (scope.day.pased == undefined) )) {
                elem.append("<div class='event'><p></p></div>");
                elem.find('.event p').text(events[0].userId.name)
            }
            else if (events.length > 0) {elem.append("<div class='blocked-cell'></div>");}  
        }

        function calculatePasedDays () {
           if (scope.day.pased == true) {
              elem.append("<div class='blocked-cell'></div>");  
           }
           var msPerDay = 86400 * 1000;
           ms1 = new Date(scope.startTime).getTime()
           var beginning =  (ms1 % msPerDay);
           var currentMs = (new Date().getTime() % msPerDay);
           if ((scope.day.current == true) && (beginning <= currentMs)){
                elem.append("<div class='blocked-cell'></div>");  
           }
        }

    	function calculateAreaBeforeStart () {
    		if ((scope.tableTime.startTimeMinute !== 0) && (scope.tableTime.startTime == scope.startTime)){
	    		var notWorkingHeight = scope.tableTime.startTimeMinute/60*60;
	    		
	    		elem.append("<div class='not-working-hours'></div>");
	    		elem.append("<div class='working-area'></div>");
	    		
	    		elem.find('.not-working-hours').css('height', notWorkingHeight+'px')
	    		elem.find('.working-area').css('height', 60-notWorkingHeight+'px')
	    	}
    	};

    	function calculateAreaAfterEnd () {
    		if ((scope.tableTime.endTimeMinute !== 0) && (scope.tableTime.endTime == scope.startTime)){
	    		elem.append("<div class='working-area'></div>");
	    		elem.append("<div class='not-working-hours'></div>");

	    		var WorkingHeight = scope.tableTime.startTimeMinute/60*60;
	    		
	    		elem.find('.not-working-hours').css('height',60-WorkingHeight+'px')
	    		elem.find('.working-area').css('height', WorkingHeight+'px')
	    	}
    	};
    	function calculateRestDays () {
    		var indexDay = new Date(scope.day.date).getDay() == 0 ? '7': new Date(scope.day.date).getDay();
    		if((indexDay<scope.startDay) || (scope.endDay < indexDay)){
    			elem.append("<div class='not-working-hours'></div>");
    			elem.find('.not-working-hours').css('height', '60px')
    		}
            else if(!scope.day.pased) {
                elem.append("<div class='working-hours'></div>");
                elem.find('.working-hours').css('height', '60px')
            }
    	}
    }
  };
});