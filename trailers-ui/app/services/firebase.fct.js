angular
  .module('app.services')
  .factory('FirebaseService', dataService);

function dataService($http, $log) {

  var data = {
    'save': save,
    'ref': ref
  };

  var config = {
    apiKey: "AIzaSyAxOC6GVOZiLcXho0vjZ5leNggVJ06bVFA",
    authDomain: "nrg-app-56be9.firebaseapp.com",
    databaseURL: "https://nrg-app-56be9.firebaseio.com",
    storageBucket: "nrg-app-56be9.appspot.com",
    messagingSenderId: "761176379936"
  };
  firebase.initializeApp(config);

  function ref(path) {
    return firebase.database().ref().child(path);
  }

  // function makeRequest(url, params) {
  //     var requestUrl = GH_BASE_URL+'/'+url;
  //     angular.forEach(params, function (value, key) {
  //         requestUrl = requestUrl + '&' + '=' + value;
  //     });
  //     return $http({
  //         'url': requestUrl,
  //         'method': 'GET',
  //         'header':{
  //             'User-Agent': 'enriquezrene',
  //             'Accept': 'application/vnd.github.v3+json'
  //         },
  //         'cache': true
  //     }).then(function (response) {
  //         return response.data;
  //     }).catch(dataServiceError);
  // }

  function save(market) {
    console.log(JSON.stringify(market));
  }

  return data;

}
