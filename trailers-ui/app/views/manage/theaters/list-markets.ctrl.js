angular.module('app.core').controller('ListMarketsController', function (marketsService, $scope, $location) {

  var vm = this;
  var marketSelected = {};

  (function initController() {
    _activate()
  })();

  function _activate() {
    marketsService.list().then(function (response) {
      vm.markets = response;
    });
  }

  vm.chooseMarket = function (market) {
    $scope.selectedMarket = market;
    $location.path('/manage-theaters/theaters').search({marketId: market.marketId});
  };



});
