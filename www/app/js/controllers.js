'use strict';

angular.module('Prode.controllers', ['jqm']).
  controller('LoginController', [
    '$scope', '$location', 'AuthenticationService', function($scope, $location, AuthenticationService) {
      $scope.credentials = { username: "", password: "" };
      $scope.login = function() {
        AuthenticationService.login($scope.credentials).then(function() {
          $location.path('/community');
        });
      }
  }])
  .controller('CommunityController', [
    'SessionService', function(SessionService) {
      var currentUser = SessionService.getCurrentUser();
  }]);
