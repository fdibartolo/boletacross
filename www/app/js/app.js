'use strict';

// Declare app level module which depends on filters, and services
angular.module('Prode', ['Prode.filters', 'Prode.services', 'Prode.directives', 'Prode.controllers', 'Prode.constants']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'app/partials/login.html'
      , controller: 'LoginController'});
    
    $routeProvider.otherwise({redirectTo: '/'});
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
