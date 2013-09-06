'use strict';

angular.module('Prode.services', ['jqm'])
  .factory('SessionService', [
    '$rootScope', function($rootScope){
      var currentUser;
      var authToken;
      var communityStats;
      var currentCommunityStatsIndex;
      var cards;
      var currentCardIndex;

      return {
        setCurrentUser: function(user){ currentUser = user; },

        getCurrentUser: function(){ return currentUser; },

        clearSession: function(){ 
          currentUser = null;
          $rootScope.shouldLoadMenu = false;
        },

        setAuthToken: function(token) { authToken = token; },

        getAuthHeader: function() { return { headers: { 'Authorization': authToken }}; },

        setCommunityStats: function(stats) { communityStats = stats; },

        getCommunityStats: function() { return communityStats; },

        setCurrentCommunityStatsIndex: function(index) { currentCommunityStatsIndex = index; },

        getCurrentCommunityStatsIndex: function() { return currentCommunityStatsIndex; },

        setCards: function(userCards) { cards = userCards; },

        getCards: function() { return cards; },

        setCurrentCardIndex: function(index) { currentCardIndex = index; },

        getCurrentCardIndex: function() { return currentCardIndex; },
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
            SessionService.setCurrentUser(data);
            deferred.resolve();
          }).
          error(function(data, status) {
            deferred.reject();
            alert("Error - Cannot authenticate user: " + data);
          });

        return deferred.promise;
      };

      var logout = function() {
        SessionService.clearSession();
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
            alert("Error - Cannot load community stats: " + data);
          });
        
        return deferred.promise;
      }

      return {
        getCommunityStats: getCommunityStats
      };
  }])
  .factory('CardsService', [
    '$q', '$http', 'cardsUrl', 'SessionService', function($q, $http, cardsUrl, SessionService) {

      var getCards = function() {
        var deferred = $q.defer();

        $http.get(cardsUrl, SessionService.getAuthHeader()).
          success(function(data, status) {
            deferred.resolve(data);
          }).
          error(function(data, status) {
            deferred.reject();
            alert("Error - Cannot load cards: " + data);
          });
        
        return deferred.promise;
      }

      var buildCardMenuItems = function(cards) {
        var result = new Array();
        var i = 0;

        for (var c in cards) {
          var tournament = cards[c].tournament_name.split('-')[0];
          var week = cards[c].week_name.split('-')[0];
          result[i] = tournament + ' - ' + week;
          i++;
        }
        return result;
      }

      return {
        getCards: getCards,
        buildCardMenuItems: buildCardMenuItems
      };
  }]);
