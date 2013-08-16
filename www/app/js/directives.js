'use strict';

/* Directives */


angular.module('Prode.directives', ['jqm']).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
