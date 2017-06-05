angular.module('MyApp').controller('ModalInstanceRequestCtrl',  function ($uibModalInstance, contacts) {
  var $ctrl = this;
  $ctrl.contacts = contacts;
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});