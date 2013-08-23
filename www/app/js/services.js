'use strict';

angular.module('Prode.services', ['jqm'])
  .factory('SessionService', [
    '$rootScope', function($rootScope){
      return {
        setCurrentUser: function(user){
          $rootScope.currentUser = user;
        },

        getCurrentUser: function(){
          return $rootScope.currentUser;
        },

        clearCurrentUser: function(){
          $rootScope.currentUser = '';
        }        
      };
  }])
  .factory('AuthenticationService', [
    '$http', '$location', 'usersUrl', 'SessionService', function($http, $location, usersUrl, SessionService) {
      return {
        login: function(credentials) {
          var auth = "Basic " + btoa(credentials.username + ":" + credentials.password);
          var custom_headers = { headers: { 'Authorization': auth }};

          $http.get(usersUrl, custom_headers).
            success(function(data, status) {
              SessionService.setCurrentUser(data.nick_name);
              $location.path('/community');
            }).
            error(function(data, status) {
              alert("Error: " + data);
            });
        },

        logout: function() {
          SessionService.clearCurrentUser();
          $location.path('/login');
        }
      };
  }]);
