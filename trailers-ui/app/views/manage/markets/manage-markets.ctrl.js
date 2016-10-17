angular.module('app.core').controller('ManageMarketsController', function (MarketsService, FirebaseService, $firebaseArray) {

  var vm = this;
  var ref = null;

  (function initController() {
    _activate()
  })();

  function _activate() {
    vm.options = {
      types: '(cities)'
    };
    vm.market = {};
    ref = FirebaseService.ref("markets");
    vm.markets = $firebaseArray(ref);
  }

  vm.save_market = function () {
    var id = vm.market['$id'];
    if(id == undefined || id == null){
      vm.markets.$add({
        name: vm.market.name,
        location: vm.market.location
      });
    } else {
      var currentMarket = vm.markets.$getRecord(id);
      currentMarket.name = vm.market.name;
      vm.markets.$save(currentMarket);
    }
    vm.market = {};
  };

  vm.edit = function (market) {
    vm.market = angular.copy(market)
  };

  vm.remove = function (market) {
    vm.markets.$remove(market);
    vm.market = {};
  };

});
