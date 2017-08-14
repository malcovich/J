angular.module('MyApp').directive('contactHour', function() {
  return {
    template: '',
    restrict: 'E',
    scope: {
        startTime: '@',
        duration: '@',
        tableTime: '='
    },
    link: function(scope, elem, attrs) {
    	if ((scope.tableTime.startTimeMinute !== 0) && (scope.tableTime.startTime == scope.startTime)){
    		var notWorkingHeight = scope.tableTime.startTimeMinute/60*60;
    		elem.append("<div class='not-working-hours'></div>");
    		elem.append("<div class='working-area'></div>");
    		elem.find('.not-working-hours').css('height', notWorkingHeight+'px')
    		elem.find('.working-area').css('height', 60-notWorkingHeight+'px')
    	}
    	if ((scope.tableTime.endTimeMinute !== 0) && (scope.tableTime.endTime == scope.startTime)){
    		elem.append("<div class='working-area'></div>");
    		elem.append("<div class='not-working-hours'></div>");
    		var WorkingHeight = scope.tableTime.startTimeMinute/60*60;
    		elem.find('.not-working-hours').css('height',60-WorkingHeight+'px')
    		elem.find('.working-area').css('height', WorkingHeight+'px')
    	}
    }
  };
});