'use strict';

angular.module('Prode.controllers', ['jqm']).
  controller('LoginController', [
    '$rootScope', '$scope', '$location', 'AuthenticationService', function($rootScope, $scope, $location, AuthenticationService) {
      $rootScope.shouldLoadMenu = false;
      $scope.credentials = { username: "", password: "" };

      $scope.login = function() {
        AuthenticationService.login($scope.credentials).then(function() {
          $rootScope.shouldLoadMenu = true;
          $location.path('/community');
        });
      }
  }])
  .controller('MenuController', [
    '$rootScope', '$scope', 'SessionService', function($rootScope, $scope, SessionService) {
      $rootScope.shouldLoadMenu = false;

      $scope.displayRankingFor = function(id) {
        SessionService.setCurrentCommunityStatsIndex(id);
      }
  }])
  .controller('CommunityController', [
    '$scope', 'SessionService', function($scope, SessionService) {

      $scope.$watch(SessionService.getCurrentCommunityStatsIndex, function (index) {
        if (index !== undefined) {
          $scope.currentStats = SessionService.getCommunityStats()[index];
        }
      });
  }]);
