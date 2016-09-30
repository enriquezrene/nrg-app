angular
    .module('app.routes', ['ngRoute'])
    .config(routes);

function routes($routeProvider) {
    $routeProvider
        .when('/blank-survey', {
            templateUrl: 'surveys/blank/blank-survey.tpl.html',
            controller: 'BlankSurveyController',
            controllerAs: 'blank'
        })
        .otherwise({
            redirectTo: '/blank-survey'
        });
}