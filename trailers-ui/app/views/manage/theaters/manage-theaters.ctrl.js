angular.module('app.core').controller('ManageTheatersController', function (marketsService, $routeParams, theatersService) {

  var vm = this;

  var marketId = null;
  vm.theater = {};


  (function initController() {
    _activate()
  })();

  function _activate() {
    vm.theaters=[];
    marketId = $routeParams.marketId;
    _loadTheaters();
  }

  function _loadTheaters(){
    theatersService.list(marketId).then(function (response) {
      vm.theaters = response;
    });
  }

  vm.save = function () {
    console.log(vm.theater.theaterId);
    console.log(!vm.theater.theaterId);
    if (!vm.theater.theaterId) {
      theatersService.save(marketId, vm.theater).then(function (data) {
        _loadTheaters();
      });
    } else {
      theatersService.update(marketId, vm.theater.theaterId, vm.theater).then(function (data) {
        _loadTheaters();
      });
    }
    vm.theater = {};
  };

  vm.edit = function (theater) {
    vm.theater = angular.copy(theater)
  };

  vm.delete = function (theater) {
    var theaterId = theater.theaterId;
    theatersService.delete(marketId, theaterId).then(function (data) {
      _loadTheaters();
    })
  };

});
