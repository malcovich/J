angular.module('MyApp').factory('ModalFactory', function($uibModal) {
	var service = {};
	service.user = localStorage.getItem('User-Data');

	service.open =  function (template, controller, resolve = {}, windowSize = 'sm', parentSelector) {
        var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var options = {
            templateUrl: template,
            controller: controller,
            controllerAs: 'vm',
            windowClass : "login",
            appendTo: parentElem
        };

        return $uibModal.open(options).result;
    }

  	return service;
});
/*
return this._$uibModal.open({
            template: createItemTemplate,
            controller: createItemController,
            controllerAs: 'vm',
            backdrop: 'static',
            keyboard: false,
            windowClass: 'modal-sm',
            resolve: {
                itemModel: () => itemModel || null,
                entityName: () => entityName,
                saveFunction: () => saveFunction    // required to return promise
            }
        }).result;*/