'use strict';

angular.module('Prode.services', ['jqm'])
  .factory('SessionService', [
    '$rootScope', function($rootScope){
      var currentUser;
      var authToken;
      var currentMenuItem;
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
          currentMenuItem = null;
        },

        setAuthToken: function(token) { authToken = token; },

        getAuthHeader: function() { return { headers: { 'Authorization': authToken }}; },

        setCurrentMenuItem: function(menuItem) { currentMenuItem = menuItem; },

        getCurrentMenuItem: function() { return currentMenuItem; },

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
    '$q', '$http', '$loadDialog', 'usersUrl', 'SessionService', function($q, $http, $loadDialog, usersUrl, SessionService) {
      
      var login = function(credentials) {
        var deferred = $q.defer();
        var auth = "Basic " + btoa(credentials.username + ":" + credentials.password);
        var custom_headers = { headers: { 'Authorization': auth }};

        $loadDialog.show('Ingresando...');

        $http.get(usersUrl, custom_headers).
          success(function(data, status) {
            SessionService.setAuthToken(auth);
            SessionService.setCurrentUser(data);
            deferred.resolve();
            $loadDialog.hide();
          }).
          error(function(data, status) {
            deferred.reject();
            $loadDialog.hide();
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
    '$q', '$http', '$loadDialog', 'communityUrl', 'SessionService', function($q, $http, $loadDialog, communityUrl, SessionService) {

      var getCommunityStats = function() {
        var deferred = $q.defer();

        $loadDialog.show('Cargando Rankings...');

        $http.get(communityUrl, SessionService.getAuthHeader()).
          success(function(data, status) {
            deferred.resolve(data);
            $loadDialog.hide();
          }).
          error(function(data, status) {
            deferred.reject();
            $loadDialog.hide();
            alert("Error - Cannot load community stats: " + data);
          });
        
        return deferred.promise;
      }

      return {
        getCommunityStats: getCommunityStats
      };
  }])
  .factory('CardsService', [
    '$q', '$http', '$loadDialog', 'cardsUrl', 'SessionService', function($q, $http, $loadDialog, cardsUrl, SessionService) {

      var getCards = function() {
        var deferred = $q.defer();

        $loadDialog.show('Cargando Tarjetas...');

        $http.get(cardsUrl, SessionService.getAuthHeader()).
          success(function(data, status) {
            deferred.resolve(data);
            $loadDialog.hide();
          }).
          error(function(data, status) {
            deferred.reject();
            $loadDialog.hide();
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

      var submitCard = function(card) {
        var submitableCard = buildSubmitableCard(card);
        
        $loadDialog.show('Guardando Tarjeta...');

        var deferred = $q.defer();
        $http.post(cardsUrl, submitableCard, SessionService.getAuthHeader()).
          success(function(data, status) {
            deferred.resolve(data);
            $loadDialog.hide();
          }).
          error(function(data, status) {
            deferred.reject();
            $loadDialog.hide();
            alert("Error - Cannot load cards: " + data);
          });
        
        return deferred.promise;
      }

      var buildSubmitableCard = function(card) {
        var submitableCard = {};
        submitableCard['card'] = {};
        submitableCard['card']['week_id'] = card.week_id;
        submitableCard['card']['matches'] = [];

        for (var m in card.matches) {
          var match = {};
          match.match_id = card.matches[m].match_id;
          match.home_score = card.matches[m].home_user_score;
          match.guest_score = card.matches[m].guest_user_score;
          submitableCard['card']['matches'][m] = match;
        }

        return submitableCard;
      }

      return {
        getCards: getCards,
        buildCardMenuItems: buildCardMenuItems,
        submitCard: submitCard
      };
  }]);
