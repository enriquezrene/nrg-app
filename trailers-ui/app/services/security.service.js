angular
  .module('app.services')
  .service('securityService', function ($http) {

    var baseUrl = 'http://localhost:8080/trailers/v1';

    this.get = function (path) {
      return $http.get(baseUrl + path);
    };

    this.delete = function (path) {
      return $http.delete(baseUrl + path);
    };

    this.post = function (path, data) {
      var url = baseUrl + path;
      return $http.post(url, data);
    };

    this.put = function (path, data) {
      var config = {};
      config.headers = {
        'Content-Type':'application/json'
      };

      var url = baseUrl + path;
      return $http.put(url, data, config);
    };

  });
