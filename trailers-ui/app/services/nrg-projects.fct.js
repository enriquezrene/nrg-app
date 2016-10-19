angular
  .module('app.services')
  .factory('NrgProjectsService', dataService);

function dataService($http, FirebaseService, $q) {

  var data = {
    'getFeatureFilms': getFeatureFilms
  };

  function getFeatureFilms(user_locale) {
    var deferred = $q.defer();
    var feature_films_ref = FirebaseService.ref("feature_films");

    feature_films_ref.once('value',
      function (dataSnapshot) {
        deferred.resolve(dataSnapshot.val());
      }
    );
    return deferred.promise;
  }

  // return [
  //   {
  //     'id': 1,
  //     'default_title': 'Cuando te toque a ti',
  //     'preferred_title': 'El Hombre Araña II',
  //     'showing_title' : 'Spider Man II - (El Hombre Araña II)'
  //   },
  //   {
  //     'id': 2,
  //     'default_title': 'Star Wars III',
  //     'preferred_title': 'La Guerra de las Galaxias III',
  //     'showing_title' : 'Star Wars III - (La Guerra de las Galaxias III)'
  //   }
  // ];


  return data;

  function dataServiceError(errorResponse) {
    $log.error('XHR failed to SurveyService');
    $log.error(errorResponse);
    return errorResponse;
  }
}
