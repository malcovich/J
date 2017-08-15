angular.module('MyApp').directive('userHour', function() {
  return {
    template: '',
    restrict: 'E',
    scope: {
        startTime: '@',
        duration: '@',
        day: '=',
        startDay: '@',
        endDay: '@',
        tableTime: '='
    },
    link: function(scope, elem, attrs) {
    	calculateAreaBeforeStart();
    	calculateAreaAfterEnd();
    	calculateRestDays();

        elem.find('.working-hours').on('click',function(){
            console.log("cloickl")
        })

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
            else {
                elem.append("<div class='working-hours'></div>");
                elem.find('.working-hours').css('height', '60px')
            }
    	}
    }
  };
});