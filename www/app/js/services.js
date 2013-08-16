'use strict';

angular.module('Prode.services', ['jqm'])
  .factory("AuthenticationService", function() {
    return {
      login: function(credentials) {
        alert("Username: " + credentials.username + ", password: " + credentials.password);
      }
    };
  });
