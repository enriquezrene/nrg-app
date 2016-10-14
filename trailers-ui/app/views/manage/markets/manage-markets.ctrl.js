angular.module('app.core').controller('ManageMarketsController', function (MarketsService, $firebaseArray) {

  var vm = this;



  vm.market = {};

  vm.options = {
    types: '(cities)'
  };

  var config = {
    apiKey: "AIzaSyB_z39DJzoGohAxnNjfzo-JS483sDIyd5Y",
    authDomain: "fir-9c801.firebaseapp.com",
    databaseURL: "https://fir-9c801.firebaseio.com",
    storageBucket: "fir-9c801.appspot.com",
    messagingSenderId: "545225286496"
  };
  firebase.initializeApp(config);


  var ref = firebase.database().ref().child("markets");
  // create a synchronized array
  vm.markets = $firebaseArray(ref);

  vm.save_market = function () {
    var id = vm.market['$id'];
    if(id == undefined || id == null){
      vm.markets.$add({
        name: vm.market.name,
        location: vm.market.location
      });
    } else {
      console.log(id);
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
  };

});
