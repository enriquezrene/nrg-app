angular.module('app.core').controller('NrgProjectsController',
  function (MarketsService, FirebaseService, $firebaseArray, NrgProjectsService) {

    var vm = this;
    var ref = null;

    (function initController() {
      _activate();
    })();

    function _activate() {
      NrgProjectsService.getFeatureFilms('en').then(function (data) {
        angular.forEach(data, function (value, key) {
          console.log(JSON.stringify(value));
          console.log('KEY:' + JSON.stringify(key));
        });
        vm.feature_films = data;
      }).catch(function (error) {
        console.log('Unable to retrieve films: ' + error);
      });
    }

    vm.create_project = function () {
      console.log('creating project');
    };

    vm.sum = function () {
      return '1';
    };

  });
