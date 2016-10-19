angular
  .module('app.services')
  .service('marketsService', function (securityService) {

    this.save = function (market) {
      return securityService.post('/markets', market).then(function successCallback(response) {
        return response.data;
      });
    };

    this.update = function (marketId, market) {
      return securityService.put('/markets/'+marketId, market).then(function successCallback(response) {
        return response.data;
      });
    };

    this.delete = function (marketId) {
      return securityService.delete('/markets/'+marketId).then(function successCallback(response) {
        return response.data;
      });
    };

    this.list = function () {
      return  securityService.get('/markets').then(function successCallback(response) {
        return response.data;
      });
    };

  });
