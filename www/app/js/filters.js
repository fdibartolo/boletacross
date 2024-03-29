'use strict';

/* Filters */

angular.module('Prode.filters', ['jqm']).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
