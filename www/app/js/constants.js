'use strict';

angular.module('Prode.constants', ['jqm']).
  value('version', '0.1').
  value('users_url', 'http://0.0.0.0:3000/api/users');
  // value('usersUrl', 'https://desolate-bayou-3667.herokuapp.com/api/users');

// angular.module('Prode.constants', ['jqm']).
//   constant('Settings', {
//     usersUrl: 'http://0.0.0.0:3000/api/users',
//     nsPrefix: 's'
//   });