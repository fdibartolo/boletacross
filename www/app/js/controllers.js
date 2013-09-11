'use strict';

angular.module('Prode.controllers', ['jqm']).
  controller('LoginController', [
    '$rootScope', '$scope', '$location', 'AuthenticationService', function($rootScope, $scope, $location, AuthenticationService) {
      $rootScope.shouldLoadMenu = false;
      $scope.credentials = { username: "fdibartolo", password: "fdibartolo" };

      $scope.login = function() {
        AuthenticationService.login($scope.credentials).then(function() {
          $rootScope.shouldLoadMenu = true;
          $location.path('/community');
        });
      }
  }])
  .controller('MenuController', [
    '$rootScope', '$scope', '$location', 'SessionService', 'AuthenticationService', function($rootScope, $scope, $location, SessionService, AuthenticationService) {
      $rootScope.shouldLoadMenu = false;

      $scope.displayRankingFor = function(id) {
        SessionService.setCurrentMenuItem('community_' + id);
        SessionService.setCurrentCommunityStatsIndex(id);
        $location.path('/community');
      }

      $scope.displayCardFor = function(id) {
        SessionService.setCurrentMenuItem('card_' + id);
        SessionService.setCurrentCardIndex(id);
        $location.path('/card');
      }

      $scope.logout = function() {
        AuthenticationService.logout();
        $location.path('/login');
      }
  }])
  .controller('CommunityController', [
    '$scope', 'SessionService', function($scope, SessionService) {

      $scope.currentUserNickName = SessionService.getCurrentUser().nick_name;
      $scope.$watch(SessionService.getCurrentCommunityStatsIndex, function (index) {
        if (index !== undefined) {
          $scope.currentStats = SessionService.getCommunityStats()[index];
        }
      });
  }])
  .controller('CardsController', [
    '$scope', 'SessionService', 'CardsService', function($scope, SessionService, CardsService) {

      $scope.$watch(SessionService.getCurrentCardIndex, function (index) {
        if (index !== undefined) {
          var card = SessionService.getCards()[index];
          $scope.card = card
          if (card.points === undefined) card.points = 0 //hack :(
          $scope.isSubmitable = Date.parse(card.due_date) > Date.now();
          $scope.isPublished = card.publish_date !== null
        }
      });

      $scope.submitCard = function() {
        CardsService.submitCard($scope.card);
      }

      $scope.isHomeScoreGuessed = function(match) {
        return $scope.isPublished && (match.home_real_score !== null) && 
          (match.home_user_score === match.home_real_score)
      }

      $scope.isHomeScoreMissed = function(match) {
        return $scope.isPublished && (match.home_real_score !== null) && 
          (match.home_user_score !== match.home_real_score)
      }

      $scope.isGuestScoreGuessed = function(match) {
        return $scope.isPublished && (match.guest_real_score !== null) && 
          (match.guest_user_score === match.guest_real_score)
      }

      $scope.isGuestScoreMissed = function(match) {
        return $scope.isPublished && (match.guest_real_score !== null) && 
          (match.guest_user_score !== match.guest_real_score)
      }

      $scope.isResultGuessed = function(match) {
        return $scope.isPublished && hasResults(match) && resultMatch(match)
      }

      $scope.isResultMissed = function(match) {
        return $scope.isPublished && hasResults(match) && (! resultMatch(match))
      }

      var hasResults = function(match) {
        return (match.home_real_score !== null) && (match.home_user_score !== null) && 
          (match.guest_real_score !== null) && (match.guest_user_score !== null)
      }

      var resultMatch = function(match) {
        return ((match.home_user_score > match.guest_user_score && match.home_real_score > match.guest_real_score) ||
          (match.home_user_score === match.guest_user_score && match.home_real_score === match.guest_real_score) ||
          (match.home_user_score < match.guest_user_score && match.home_real_score < match.guest_real_score))
      }
    }]);
