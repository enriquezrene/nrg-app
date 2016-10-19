angular.module('app.core').controller('ManageMarketsController', function (marketsService, $http) {

  var vm = this;
  var marketId = null;
  vm.market = {};

  (function initController() {
    _activate()
  })();

  function _activate() {
    $http.get('_iso_3166_alpha2.json').success(function (data) {
      vm.country_codes = data;
    });
    vm.markets = [];
    _findMarkets();
  }

  function _findMarkets () {
    marketsService.list().then(function (response) {
      vm.markets = response;
    });
  }

  vm.saveMarket = function () {
    if (!this.marketId) {
      marketsService.save(vm.market).then(function (data) {
        _findMarkets();
      });
    } else {
      marketsService.update(this.marketId, vm.market).then(function (data) {
        this.marketId = null;
        _findMarkets();
      });
    }
    vm.market = {};
  };

  vm.edit = function (market) {
    vm.market = angular.copy(market)
    this.marketId = vm.market.marketId;
  };

  vm.delete = function (market) {
    var marketId = market.marketId;
    marketsService.delete(marketId).then(function (data) {
      _findMarkets();
    });
  };

});
