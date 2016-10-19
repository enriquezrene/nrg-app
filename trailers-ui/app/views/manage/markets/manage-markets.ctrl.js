angular.module('app.core').controller('ManageMarketsController', function (MarketsService, FirebaseService, $firebaseArray, $http) {

  var vm = this;
  var ref = null;
  vm.market = {};

  (function initController() {
    _activate()
  })();

  function _activate() {

    $http.get('_iso_3166_alpha2.json').success(function (data) {
      console.log(data);
      vm.country_codes = data;
    });

    vm.market = {};
    ref = FirebaseService.ref("markets");
    vm.markets = $firebaseArray(ref);
  }

  vm.save_market = function () {
    var id = vm.market['$id'];
    if (id == undefined || id == null) {
      vm.markets.$add({
        name: vm.market.name,
        country: vm.market.country
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
