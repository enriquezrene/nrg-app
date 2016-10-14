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
