angular.module('MyApp')
  .controller('WorkersProfileController', ['$scope', 'user', '$uibModal', '$http','$state','$stateParams','ModalFactory', function($scope, user, $uibModal, $http, $state, $stateParams, ModalFactory){
  	var $ctrl = this;

  	init();

	function init() {
   	    $ctrl.user = user.data;

   	    $http.post('/api/contact/item', {'_id': $ctrl.user.linked_contact}).then(function(res, err){
            $ctrl.contact = res.data;
            $ctrl.copyContact = angular.copy($ctrl.contact);

            if ($ctrl.contact.type_work_place == "both"){
            	$ctrl.office = true;
            	$ctrl.home = true;
            }else if($ctrl.contact.type_work_place == "ofice") {
            	$ctrl.office = true;
            }else {
            	$ctrl.home = true;
            }

            if ($ctrl.contact.working_days_by_contacts.length == 1){
            	$ctrl.contact.startday1 = $ctrl.contact.working_days_by_contacts[0].startday;
            	$ctrl.contact.endday1 = $ctrl.contact.working_days_by_contacts[0].endday;
            	$ctrl.startTime1 = $ctrl.contact.working_days_by_contacts[0].startTime;
            	$ctrl.endTime1 = $ctrl.contact.working_days_by_contacts[0].endTime;
            }
            $ctrl.loadCategories();
        });
	};

	$ctrl.loadCategories = function(){
		$http.post('/api/categories/list', {'userId': $ctrl.user._id}).then(function(res){
		    $ctrl.listCategories = res.data;
		});
	}

	$ctrl.save = function(){
		console.log($ctrl.startTime1)
		var obj = {
			'name' : $ctrl.contact.name,
			'spec' : $ctrl.contact.spec, 
			'description': $ctrl.contact.description,
			'category' : $ctrl.contact.category,
			'address' : $ctrl.contact.address
		};

		obj.working_days_by_contacts = [];

		timeObj = {
			'startday' : $ctrl.contact.startday1,
			'endday' : $ctrl.contact.endday1,
			'startTime' : $ctrl.startTime1,
			'endTime' : $ctrl.endTime1
		}

		obj.working_days_by_contacts[0] = timeObj;

		if (($ctrl.office == true) && ($ctrl.home == true)){
			obj.type_work_place = "both";
		}else if($ctrl.office == true) {
			obj.type_work_place = 'ofice';
		}else if ($ctrl.home == true){
			obj.type_work_place = 'client';
		}
		
		$http.post('/api/contact/updateInfoByContact',{'id' : $ctrl.contact._id, 'obj' : obj}).then(function(res, err){

		})
	}
}]);

