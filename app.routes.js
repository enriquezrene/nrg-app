angular
    .module('app.routes', ['ngRoute'])
    .config(routes);

function routes($routeProvider) {
    $routeProvider
        .when('/blank-survey', {
            templateUrl: 'surveys/blank/blank-survey.tpl.html',
            controller: 'BlankSurveyController',
            controllerAs: 'blank'
        }).when('/fill-survey', {
        templateUrl: 'surveys/fill/fill-survey.tpl.html',
        controller: 'FillSurveyController',
        controllerAs: 'fill'
    }).otherwise({
        redirectTo: '/blank-survey'
    });
}