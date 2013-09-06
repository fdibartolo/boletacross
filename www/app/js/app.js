'use strict';

var app = angular.module('Prode', [
  'jqm',
  'Prode.filters', 
  'Prode.services', 
  'Prode.directives', 
  'Prode.controllers', 
  'Prode.constants'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'app/partials/login.html',
    controller: 'LoginController'});

  $routeProvider.when('/community', {
    animation: 'page-slide',
    templateUrl: 'app/partials/community.html',
    controller: 'CommunityController'});

  $routeProvider.when('/card', {
    animation: 'page-slide',
    templateUrl: 'app/partials/card.html',
    controller: 'CardsController'});

  $routeProvider.otherwise({redirectTo: '/login'});
}]);

app.factory('httpInterceptor', ['$q', '$location', function ($q, $location) {
  return {
    responseError: function (response) {
      if (response.status == 401) {
        $location.path('/login');
        return;
      }
      return $q.reject(response);
    }
  };
}]);

app.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('httpInterceptor');
}]);




// // phonegap 
// var app = {
//   // Application Constructor
//   initialize: function() {
//     this.bindEvents();
//   },
//   // Bind Event Listeners
//   //
//   // Bind any events that are required on startup. Common events are:
//   // 'load', 'deviceready', 'offline', and 'online'.
//   bindEvents: function() {
//     document.addEventListener('deviceready', this.onDeviceReady, false);
//   },
//   // deviceready Event Handler
//   //
//   // The scope of 'this' is the event. In order to call the 'receivedEvent'
//   // function, we must explicity call 'app.receivedEvent(...);'
//   onDeviceReady: function() {
//     app.receivedEvent('deviceready');
//   },
//   // Update DOM on a Received Event
//   receivedEvent: function(id) {
//     var parentElement = document.getElementById(id);
//     var listeningElement = parentElement.querySelector('.listening');
//     var receivedElement = parentElement.querySelector('.received');

//     listeningElement.setAttribute('style', 'display:none;');
//     receivedElement.setAttribute('style', 'display:block;');
//   }
// };
