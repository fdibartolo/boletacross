'use strict';

angular.module('Prode.controllers', []).
  controller('LoginController', ['$scope', 'AuthenticationService', function($scope, AuthenticationService) {
    $scope.credentials = { username: "", password: "" };

    $scope.login = function() {
      AuthenticationService.login($scope.credentials);
      // alert("Username: " + $scope.credentials.username + ", password: " + $scope.credentials.password);
    }
  }])
  .controller('MyCtrl2', [function() {

  }]);
