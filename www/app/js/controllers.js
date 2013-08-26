'use strict';

angular.module('Prode.controllers', ['jqm']).
  controller('LoginController', [
    '$rootScope', '$scope', '$location', 'AuthenticationService', function($rootScope, $scope, $location, AuthenticationService) {
      $scope.credentials = { username: "", password: "" };
      $scope.login = function() {
        AuthenticationService.login($scope.credentials).then(function() {
          $rootScope.shouldLoadMenu = true;
          $location.path('/community');
        });
      }
  }])
  .controller('MenuController', [
    '$rootScope', function($rootScope) {
      $rootScope.shouldLoadMenu = false;
  }])
  .controller('CommunityController', [
    'SessionService', function(SessionService) {
      var currentUser = SessionService.getCurrentUser();
  }]);
