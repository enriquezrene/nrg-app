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
