angular.module('app.core').controller('ManageMarketsController', function (MarketsService) {

  var vm = this;

  vm.market = {};
  vm.markets =
    [{'name': 'My Awesome Market'},
      {'name': 'London Geek'}];

  vm.options = {
    types: '(cities)'
  };

  vm.save_market = function () {
    MarketsService.save(vm.market);
  };

});
