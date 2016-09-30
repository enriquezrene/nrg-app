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