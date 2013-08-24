'use strict';

angular.module('Prode.services', ['jqm'])
  .factory('SessionService', [
    '$rootScope', function($rootScope){
      return {
        setCurrentUser: function(user){ $rootScope.currentUser = user; },

        getCurrentUser: function(){ return $rootScope.currentUser; },

        clearCurrentUser: function(){ $rootScope.currentUser = ''; },

        setAuthToken: function(token) { $rootScope.authToken = token; },

        getAuthHeader: function() { return { headers: { 'Authorization': $rootScope.authToken }}; } 
      };
  }])
  .factory('AuthenticationService', [
    '$q', '$http', 'usersUrl', 'SessionService', function($q, $http, usersUrl, SessionService) {
      
      var login = function(credentials) {
        var deferred = $q.defer();
        var auth = "Basic " + btoa(credentials.username + ":" + credentials.password);
        var custom_headers = { headers: { 'Authorization': auth }};

        $http.get(usersUrl, custom_headers).
          success(function(data, status) {
            SessionService.setAuthToken(auth);
            SessionService.setCurrentUser(data.nick_name);
            deferred.resolve();
          }).
          error(function(data, status) {
            deferred.reject();
            alert("Error: " + data);
          });

        return deferred.promise;
      };

      var logout = function() {
        SessionService.clearCurrentUser();
        $location.path('/login');
      };

      return {
        login: login,
        logout: logout
      };
  }])
  .factory('CommunityService', [
    '$q', '$http', 'communityUrl', 'SessionService', function($q, $http, communityUrl, SessionService) {

      var getCommunityStats = function() {
        var deferred = $q.defer();

        $http.get(communityUrl, SessionService.getAuthHeader()).
          success(function(data, status) {
            deferred.resolve(data);
          }).
          error(function(data, status) {
            deferred.reject();
            alert("Error: " + data);
          });
        
        return deferred.promise;
      }

      return {
        getCommunityStats: getCommunityStats
      };
  }]);

