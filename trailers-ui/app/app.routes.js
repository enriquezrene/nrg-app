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
    .when('/manage-theaters/show-markets', {
      templateUrl: 'views/manage/theaters/list-markets.tpl.html',
      controller: 'ListMarketsController',
      controllerAs: 'vm'
    })
    .when('/manage-theaters/theaters', {
      templateUrl: 'views/manage/theaters/manage-theaters.tpl.html',
      controller: 'ManageTheatersController',
      controllerAs: 'vm'
    })
    .when('/nrg/projects/manage', {
      templateUrl: 'views/projects/nrg/nrg-projects.tpl.html',
      controller: 'NrgProjectsController',
      controllerAs: 'nrgProjectsController'
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
