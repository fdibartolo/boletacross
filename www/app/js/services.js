'use strict';

angular.module('Prode.services', ['jqm'])
  .factory("AuthenticationService", ['$http', 'users_url', function($http, users_url) {
    return {
      login: function(credentials) {
        var auth = "Basic " + btoa(credentials.username + ":" + credentials.password);
        var custom_headers = { headers: { 'Authorization': auth }};

        $http.get(users_url, custom_headers).
          success(function(data, status) {
            alert("Good login for " + data.nick_name);
          }).
          error(function(data, status) {
            // if 401 ->
            alert("Error" + data);
          });
      }
    };
  }]);
