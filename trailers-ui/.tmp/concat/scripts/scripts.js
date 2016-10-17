angular.module('app', ['app.routes', 'app.core', 'app.translate']);

'use strict';

/**
 * @ngdoc overview
 * @name angularDemoApp
 * @description
 * # angularDemoApp
 *
 * Main module of the application.
 */
angular
  .module('app.angular.default', [
    'ui.bootstrap',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch'
  ]);

angular.module('app.core', ['app.services', 'ngAutocomplete', 'ui.bootstrap', 'ngResource', 'firebase']);

angular
  .module('app.routes', ['ngRoute'])
  .config(routes);

function routes($routeProvider) {
  $routeProvider
    .when('/manage/markets', {
      templateUrl: 'views/manage/markets/manage-markets.tpl.html',
      controller: 'ManageMarketsController',
      controllerAs: 'manageMarkets'
    })
    .when('/blank-survey', {
      templateUrl: 'views/surveys/blank/blank-survey.tpl.html',
      controller: 'BlankSurveyController',
      controllerAs: 'blank'
    })
    .when('/fill-survey', {
      templateUrl: 'views/surveys/fill/fill-survey.tpl.html',
      controller: 'FillSurveyController',
      controllerAs: 'fill'
    }).otherwise({
    redirectTo: '/blank-survey'
  });
}
routes.$inject = ["$routeProvider"];

angular.module('app.services', []);

angular
  .module('app.translate', ['pascalprecht.translate'])
  .config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
      'Menu.download.form': 'Download Form',
      'Menu.fill.form': 'Fill Form',
      'Basic.info.title': 'Basic Information',
      'Trailers.info.title': 'Trailers',
      'Btn.print.form': 'Print Form',
      'Label.name': 'Name',
      'Label.last.name': 'Last Name',
      'Label.email': 'Email',
      'Label.date': 'Date',
      'Label.city': 'City',
      'Label.theater': 'Theater',
      'Title.manage.markets': 'Markets',
      'Menu.manage.markets': 'Manage Markets',
      'Label.market.country': 'Country',
      'Label.market.name': 'Market Name',
      'Label.market.city': 'City',
      'Btn.add.market': 'Save',
      'Label.showtime': 'Time',
      'Label.order': 'Order of Play',
      'Label.seconds': 'seconds',
      'Btn.add.trailer': 'Add trailer',
      'Label.no.records': 'No records added',
      'Label.screen': 'Screen',
      'Label.movie.name': 'Movie',
      'Label.movie.format.2D': '2D',
      'Label.movie.format.3D': '3D',
      'Label.trailer.name': 'Trailer Name',
      'Label.trailer.distributor': 'Distributor',
      'Label.duration': 'Length Duration',
      'Label.actions': 'Actions',
      'Label.duration.classification': 'Length Classification'
    });

    $translateProvider.translations('es', {
      'Menu.download.form': 'Descargar Formulario',
      'Menu.fill.form': 'Llenar Formulario',
      'Basic.info.title': 'Informacion Basica',
      'Trailers.info.title': 'Comerciales',
      'Btn.print.form': 'Imprimir Formulario',
      'Label.name': 'Nombre',
      'Label.last.name': 'Apellido',
      'Label.email': 'Email',
      'Label.date': 'Fecha',
      'Label.city': 'Ciudad',
      'Label.theater': 'Teatro',
      'Label.showtime': 'Hora de la Funcion',
      'Label.showtime': 'Hora',
      'Label.order': 'Orden',
      'Label.duration': 'Duracion',
      'Label.seconds': 'segundos',
      'Btn.add.trailer': 'Añadir Trailer',
      'Label.no.records': 'No se han agregado registros'
    });

    $translateProvider.translations('de', {
      'Menu.download.form': 'Formular herunterladen',
      'Menu.fill.form': 'Formular ausfüllen',
      'Basic.info.title': 'Grundlagen ',
      'Trailers.info.title': 'Anhänger',
      'Btn.print.form': 'Druckform',
      'Label.name': 'Vorname',
      'Label.last.name': 'Zuname',
      'Label.email': 'E-Mail',
      'Label.date': 'Datum',
      'Label.city': 'City',
      'Label.theater': 'Schauspielhaus',
      'Label.showtime': 'Performanz - Stunde',
      'Label.order': 'Verordnung',
      'Label.duration': 'Dauer',
      'Label.seconds': 'sekunden',
      'Btn.add.trailer': 'Beifügen Handels',
      'Label.no.records': 'Keine Datensätze hinzugefügt'
    });


    $translateProvider.translations('fr', {
      'Menu.download.form': 'Télécharger Form',
      'Menu.fill.form': 'Remplissez le formulaire',
      'Basic.info.title': 'Informations de base',
      'Trailers.info.title': 'Remorques',
      'Btn.print.form': 'Print Form',
      'Label.name': 'Nom',
      'Label.last.name': 'Le Nom',
      'Label.email': 'Email',
      'Label.date': 'Date',
      'Label.city': 'City',
      'Label.theater': 'Theater',
      'Label.showtime': 'Showtime Hour',
      'Label.order': 'Ordre',
      'Label.duration': 'Durée',
      'Label.seconds': 'secondes',
      'Btn.add.trailer': 'Ajouter commerciale',
      'Label.no.records': 'No records ajoutés'
    });

    $translateProvider.translations('it', {
      'Menu.download.form': 'Scarica il modulo',
      'Menu.fill.form': 'Compilare il modulo',
      'Basic.info.title': 'Informazioni di base',
      'Trailers.info.title': 'Trailers',
      'Btn.print.form': 'Modulo di stampa',
      'Label.name': 'Nome',
      'Label.last.name': 'Cognome',
      'Label.email': 'e-mail',
      'Label.date': 'Data',
      'Label.city': 'City',
      'Label.theater': 'Teatro',
      'Label.showtime': 'Showtime Hour',
      'Label.order': 'Ordine',
      'Label.duration': 'Durata',
      'Label.seconds': 'secondi',
      'Btn.add.trailer': 'Aggiungi commerciale',
      'Label.no.records': 'Non ci sono record aggiunti'
    });

    $translateProvider.preferredLanguage('en');
  }]);

angular.module('app.core').controller('BlankSurveyController', function () {
  var vm = this;

  vm.calendar_open = false;

  vm.date = undefined;
  vm.date_picker_options = {
    formatYear: 'yy',
    startingDay: 1
  };
  vm.date_picker_alt_input_formats = ['d!/M!/yyyy'];

  vm.show_calendar = function () {
    vm.calendar_open = true;
  };
});

angular.module('app.core').controller('FillSurveyController', function () {

  var vm = this;

  vm.calendar_open = false;

  vm.trailer = {};

  var current_trailer_index = -1;

  vm.date = undefined;
  vm.date_picker_options = {
    formatYear: 'yy',
    startingDay: 1
  };
  vm.date_picker_alt_input_formats = ['d!/M!/yyyy'];

  vm.show_calendar = function () {
    vm.calendar_open = true;
  };

  vm.options = {
    types: '(cities)'
  };

  vm.trailers_entered = [
    {
      'trailer_order': 1,
      'trailer_name': 'Star Wars II',
      'trailer_duration': 90,
      'trailer_distributor': 'Universal World'
    },
    {
      'trailer_order': 2,
      'trailer_name': 'Pocahontas',
      'trailer_duration': 30,
      'trailer_distributor': 'Disney'
    }
  ];

  vm.trailer_down = function (trailer) {
    var current_trailer_order = trailer.trailer_order;
    var current_trailer_index = vm.trailers_entered.indexOf(trailer);
    if (current_trailer_index == vm.trailers_entered.length-1) {
      return;
    }
    var after_trailer = vm.trailers_entered[current_trailer_index + 1];
    trailer.trailer_order = after_trailer.trailer_order;
    after_trailer.trailer_order = current_trailer_order;
    order_trailers();
  };

  vm.trailer_up = function (trailer) {
    var current_trailer_order = trailer.trailer_order;
    var current_trailer_index = vm.trailers_entered.indexOf(trailer);
    if (current_trailer_index == 0) {
      return;
    }
    var before_trailer = vm.trailers_entered[current_trailer_index - 1];
    trailer.trailer_order = before_trailer.trailer_order;
    before_trailer.trailer_order = current_trailer_order;
    order_trailers();
  };

  vm.add_trailer = function () {
    if (current_trailer_index >= 0) {
      vm.trailers_entered.splice(current_trailer_index, 1, vm.trailer);
      current_trailer_index = -1;
    } else {
      vm.trailers_entered.push(vm.trailer);
    }
    order_trailers();
    vm.trailer = {};
  };

  vm.edit_trailer = function (trailer) {
    current_trailer_index = vm.trailers_entered.indexOf(trailer);
    vm.trailer = angular.copy(trailer);
  };

  vm.remove_trailer = function (trailer) {
    var index_for_remove = vm.trailers_entered.indexOf(trailer);
    if (index_for_remove !== -1) {
      vm.trailers_entered.splice(index_for_remove, 1);
    }
  };

  function order_trailers(){
    vm.trailers_entered.sort(function (a, b) {
      if(a.trailer_order < b.trailer_order){
        return -1;
      } else if(a.trailer_order > b.trailer_order){
        return 1;
      } else {
        return 0;
      }
    })
  }

});

angular.module('app.core').controller('i18nCtrl', ['$translate', '$scope', function ($translate, $scope) {

    $scope.changeLanguage = function (lang) {
        $translate.use(lang);
    };

}]);
angular.module('app.core').controller('ManageMarketsController', ["MarketsService", "$firebaseArray", function (MarketsService, $firebaseArray) {

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
      vm.market = {};
    }
  };

  vm.edit = function (market) {
    vm.market = angular.copy(market)
  };

  vm.remove = function (market) {
    vm.markets.$remove(market);
  };

}]);

angular.module('app')
    .directive('bsActiveLink', ['$location', function ($location) {
        return {
            restrict: 'A', //use as attribute
            replace: false,
            link: function (scope, elem) {
                //after the route has changed
                scope.$on("$routeChangeSuccess", function () {
                    var hrefs = ['/#' + $location.path(),
                        '#' + $location.path(), //html5: false
                        $location.path()]; //html5: true
                    angular.forEach(elem.find('a'), function (a) {
                        a = angular.element(a);
                        if (-1 !== hrefs.indexOf(a.attr('href'))) {
                            a.parent().addClass('active');
                        } else {
                            a.parent().removeClass('active');
                        }
                        ;
                    });
                });
            }
        }
    }]);

'use strict';

/**
 * A directive for adding google places autocomplete to a text box
 * google places autocomplete info: https://developers.google.com/maps/documentation/javascript/places
 *
 * Usage:
 *
 * <input type="text"  ng-autocomplete ng-model="autocomplete" options="options" details="details/>
 *
 * + ng-model - autocomplete textbox value
 *
 * + details - more detailed autocomplete result, includes address parts, latlng, etc. (Optional)
 *
 * + options - configuration for the autocomplete (Optional)
 *
 *       + types: type,        String, values can be 'geocode', 'establishment', '(regions)', or '(cities)'
 *       + bounds: bounds,     Google maps LatLngBounds Object, biases results to bounds, but may return results outside these bounds
 *       + country: country    String, ISO 3166-1 Alpha-2 compatible country code. examples; 'ca', 'us', 'gb'
 *       + watchEnter:         Boolean, true; on Enter select top autocomplete result. false(default); enter ends autocomplete
 *
 * example:
 *
 *    options = {
 *        types: '(cities)',
 *        country: 'ca'
 *    }
 **/

angular.module( "ngAutocomplete", [])
    .directive('ngAutocomplete', function() {
        return {
            require: 'ngModel',
            scope: {
                ngModel: '=',
                options: '=?',
                details: '=?'
            },

            link: function(scope, element, attrs, controller) {

                //options for autocomplete
                var opts
                var watchEnter = false
                //convert options provided to opts
                var initOpts = function() {

                    opts = {}
                    if (scope.options) {

                        if (scope.options.watchEnter !== true) {
                            watchEnter = false
                        } else {
                            watchEnter = true
                        }

                        if (scope.options.types) {
                            opts.types = []
                            opts.types.push(scope.options.types)
                            scope.gPlace.setTypes(opts.types)
                        } else {
                            scope.gPlace.setTypes([])
                        }

                        if (scope.options.bounds) {
                            opts.bounds = scope.options.bounds
                            scope.gPlace.setBounds(opts.bounds)
                        } else {
                            scope.gPlace.setBounds(null)
                        }

                        if (scope.options.country) {
                            opts.componentRestrictions = {
                                country: scope.options.country
                            }
                            scope.gPlace.setComponentRestrictions(opts.componentRestrictions)
                        } else {
                            scope.gPlace.setComponentRestrictions(null)
                        }
                    }
                }

                if (scope.gPlace == undefined) {
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
                }
                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                    var result = scope.gPlace.getPlace();
                    if (result !== undefined) {
                        if (result.address_components !== undefined) {

                            scope.$apply(function() {

                                scope.details = result;

                                controller.$setViewValue(element.val());
                            });
                        }
                        else {
                            if (watchEnter) {
                                getPlace(result)
                            }
                        }
                    }
                })

                //function to get retrieve the autocompletes first result using the AutocompleteService
                var getPlace = function(result) {
                    var autocompleteService = new google.maps.places.AutocompleteService();
                    if (result.name.length > 0){
                        autocompleteService.getPlacePredictions(
                            {
                                input: result.name,
                                offset: result.name.length
                            },
                            function listentoresult(list, status) {
                                if(list == null || list.length == 0) {

                                    scope.$apply(function() {
                                        scope.details = null;
                                    });

                                } else {
                                    var placesService = new google.maps.places.PlacesService(element[0]);
                                    placesService.getDetails(
                                        {'reference': list[0].reference},
                                        function detailsresult(detailsResult, placesServiceStatus) {

                                            if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
                                                scope.$apply(function() {

                                                    controller.$setViewValue(detailsResult.formatted_address);
                                                    element.val(detailsResult.formatted_address);

                                                    scope.details = detailsResult;

                                                    //on focusout the value reverts, need to set it again.
                                                    var watchFocusOut = element.on('focusout', function(event) {
                                                        element.val(detailsResult.formatted_address);
                                                        element.unbind('focusout')
                                                    })

                                                });
                                            }
                                        }
                                    );
                                }
                            });
                    }
                }

                controller.$render = function () {
                    var location = controller.$viewValue;
                    element.val(location);
                };

                //watch options provided to directive
                scope.watchOptions = function () {
                    return scope.options
                };
                scope.$watch(scope.watchOptions, function () {
                    initOpts()
                }, true);

            }
        };
    });

angular
    .module('app.services')
    .constant('GH_BASE_URL', 'https://api.github.com')
    .factory('SurveyService', dataService);

function dataService($http, GH_BASE_URL, $log) {

    var data = {
        'getRepos' : getRepos
    };
    
    function makeRequest(url, params) {
        var requestUrl = GH_BASE_URL+'/'+url;
        angular.forEach(params, function (value, key) {
            requestUrl = requestUrl + '&' + '=' + value;
        });
        return $http({
            'url': requestUrl,
            'method': 'GET',
            'header':{
                'User-Agent': 'enriquezrene',
                'Accept': 'application/vnd.github.v3+json'
            },
            'cache': true
        }).then(function (response) {
            return response.data;
        }).catch(dataServiceError);
    }

    function getRepos(username) {
        return makeRequest('users/enriquezrene/repos', {});
    }

    return data;

    function dataServiceError(errorResponse) {
        $log.error('XHR failed to SurveyService');
        $log.error(errorResponse);
        return errorResponse;
    }
}
angular
    .module('app.services')
    .factory('MarketsService', dataService);

function dataService($http, $log) {

    var data = {
        'save' : save
    };

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
dataService.$inject = ["$http", "$log"];

angular.module('app.core').directive('checkOrder', function () {
  return {
    restrict : 'A',
    scope : {

    },
    require: 'ngModel',
    link: function ($scope, $element, $attrs, $ctrl) {
      $ctrl.$validators.checkOrder = function (modelValue) {
        if(modelValue!=undefined){
          var orderEntered = modelValue.trim();
          for(var trailer in $scope.trailers_entered){
            if(trailer.trailer_order == order){
              return false;
            }
          }
          return true;
        }
      }
    }
  };
});

