'use strict';

angular.module('myApp.controllers', []).
  controller('LoginController', ['$scope', function($scope) {
    $scope.credentials = { username: "", password: "" };

    $scope.login = function() {
      alert("Username: " + $scope.credentials.username + ", password: " + $scope.credentials.password);
    }
  }])
  .controller('MyCtrl2', [function() {

  }]);
