'use strict';

angular.module('Prode.directives', ['jqm']).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('linkToLogout', ['AuthenticationService', function(AuthenticationService){
    return function(){
      AuthenticationService.logout();
    };
  }]).
  directive('sideMenu', [function(){
    return function(scope, elm, attrs){
      elm.text('eeededededf');
    };
  }]);
