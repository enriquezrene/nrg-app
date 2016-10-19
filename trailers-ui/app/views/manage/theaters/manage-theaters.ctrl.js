angular.module('app.core').controller('ManageTheatersController', function (FirebaseService, $firebaseArray, MarketsService) {

  var vm = this;
  var theaters_ref = null;

  (function initController() {
    _activate()
  })();

  function _activate() {
    vm.theater = {};
    theaters_ref = FirebaseService.ref("theaters");
    MarketsService.getMarkets().then(function (data) {
      vm.markets = data;
    });
    vm.theaters = $firebaseArray(theaters_ref);
  }

  vm.save = function () {
    var id = vm.theater['$id'];
    if (id == undefined || id == null) {
      vm.theaters.$add({
        marketRowguid : vm.theater.marketRowguid,
        name: vm.theater.name,
        city: vm.theater.city,
        address: vm.theater.address,
        website: vm.theater.website
      });
    } else {
      var currentTheater = vm.theaters.$getRecord(id);
      currentTheater.market_rowguid = vm.theater.market_rowguid;
      currentTheater.name = vm.theater.name;
      currentTheater.city = vm.theater.city;
      currentTheater.address = vm.theater.address;
      currentTheater.website = vm.theater.website;
      vm.theaters.$save(currentTheater);
    }
    vm.theater = {};
  };

  vm.edit = function (theater) {
    vm.theater = angular.copy(theater)
  };

  vm.remove = function (theater) {
    vm.theaters.$remove(theater);
    vm.theater = {};
  };

});
