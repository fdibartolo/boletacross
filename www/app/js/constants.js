'use strict';

var baseUrl = 'http://0.0.0.0:3000';
// var baseUrl = 'https://desolate-bayou-3667.herokuapp.com'

angular.module('Prode.constants', ['jqm']).
  value('version', '0.1').
  value('usersUrl', baseUrl + '/api/users').
  value('communityUrl', baseUrl + '/api/community').
  value('cardsUrl', baseUrl + '/api/cards');

// angular.module('Prode.constants', ['jqm']).
//   constant('Settings', {
//     usersUrl: 'http://0.0.0.0:3000/api/users',
//     nsPrefix: 's'
//   });