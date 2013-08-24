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
  directive('sideMenu', ['CommunityService', function(CommunityService){
    return function(scope, elm, attrs){
      var rankings;
      CommunityService.getCommunityStats().then(function(stats) {
        rankings = stats;

        //build ranking menu
      });

      var htmlText = '<div>' +
        '<div>iiiiiiiiii</div>' +
        '<div>aaaaa</div>' +
        '</div>';
      elm.replaceWith(htmlText);
    };
  }]);
