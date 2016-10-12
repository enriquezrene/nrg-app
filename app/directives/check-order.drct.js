angular.module('app.core').directive('checkOrder', function () {
  return {
    restrict : 'A',
    scope : {

    },
    require: 'ngModel',
    link: function ($scope, $element, $attrs, $ctrl) {
      $ctrl.$validators.checkOrder = function (modelValue) {
        if(modelValue!=undefined){
          var orderEntered = modelValue.trim();
          for(var trailer in $scope.trailers_entered){
            if(trailer.trailer_order == order){
              return false;
            }
          }
          return true;
        }
      }
    }
  };
});
