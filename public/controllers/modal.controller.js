angular.module('MyApp').controller('ModalInstanceCtrl',  function ($uibModalInstance,contacts) {
  var $ctrl = this;
  $ctrl.contacts = contacts;
  console.log('qfsdfs')
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});