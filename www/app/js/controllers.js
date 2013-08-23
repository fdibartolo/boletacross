'use strict';

angular.module('Prode.controllers', ['jqm']).
  controller('LoginController', [
    '$scope', 'AuthenticationService', function($scope, AuthenticationService) {
      $scope.credentials = { username: "", password: "" };
      $scope.login = function() {
        AuthenticationService.login($scope.credentials);
      }
  }])
  .controller('CommunityController', [
    'SessionService', function(SessionService) {
      var currentUser = SessionService.getCurrentUser();
  }]);
