angular
  .module('app.services')
  .service('theatersService', function (securityService) {

    this.save = function (marketId, theater) {
      return securityService.post('/theaters/'+marketId, theater).then(function successCallback(response) {
        return response.data;
      });
    };

    this.update = function (marketId, theaterId, theater) {
      return securityService.put('/theaters/'+marketId+'/'+theaterId, theater).then(function successCallback(response) {
        return response.data;
      });
    };

    this.delete = function (marketId, theaterId) {
      return securityService.delete('/theaters/'+marketId+'/'+theaterId).then(function successCallback(response) {
        return response.data;
      });
    };

    this.list = function (marketId) {
      return  securityService.get('/theaters?marketId='+marketId).then(function successCallback(response) {
        return response.data;
      });
    };

  });
