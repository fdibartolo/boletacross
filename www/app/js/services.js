'use strict';

angular.module('Prode.services', [])
  .factory("AuthenticationService", function() {
    return {
      login: function(credentials) {
        alert("Username: " + credentials.username + ", password: " + credentials.password);
      }
    };
  });

angular.module('Prode.constants', []).
  value('version', '0.1');
