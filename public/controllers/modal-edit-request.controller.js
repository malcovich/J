angular.module('MyApp').controller('ModalInstanceEditRequestCtrl',  function ($uibModalInstance, request) {
  var $ctrl = this;
  $ctrl.request = request;
  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});