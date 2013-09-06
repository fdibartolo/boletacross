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
    '$scope', 'SessionService', function($scope, SessionService) {

      $scope.$watch(SessionService.getCurrentCardIndex, function (index) {
        if (index !== undefined) {
          $scope.card = SessionService.getCards()[index];
        }
      });
  }]);
