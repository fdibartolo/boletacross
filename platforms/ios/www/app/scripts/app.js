var app = angular.module("app", [])

app.config(function($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: 'app/views/login.html',
    controller: 'LoginController'
  });

  $routeProvider.otherwise({ redirectTo: '/' });
});