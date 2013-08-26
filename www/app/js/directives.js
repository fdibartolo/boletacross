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
  directive('menu', [
    '$rootScope', 'CommunityService', function($rootScope, CommunityService){
      return {
        restrict: 'A',
        templateUrl: 'app/partials/menu.html',
        // template:
        //   "<div>" +
        //   // "  {{name}}: <input ng-model='amount' />" +
        //   // "  <button ng-click='save()'>Save</button>" +
        //   "  <div>Loaded: {{shouldLoadMenu}}</div>" +
        //   "</div>",
        replace: true,
        link: function (scope, element, attrs, controller) {
          scope.$watch("shouldLoadMenu", function (shouldLoadMenu) {
            console.log("shouldLoadMenu has changed to: " + shouldLoadMenu);

            if (shouldLoadMenu) {
              CommunityService.getCommunityStats().then(function(stats) {
                console.log('Community Loaded:');
                console.log(stats);

                //build ranking menu
              });
            }
          });
        }
      }
  }]);
