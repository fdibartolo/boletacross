'use strict';

angular.module('Prode.directives', ['jqm'])
  .directive('linkToLogout', ['AuthenticationService', function(AuthenticationService){
    return function(){
      AuthenticationService.logout();
    };
  }])
  .directive('menu', [
    '$rootScope', 'SessionService', 'CommunityService', function($rootScope, SessionService, CommunityService){
      return {
        restrict: 'A',
        templateUrl: 'app/partials/menu.html',
        replace: true,
        link: function (scope, element, attrs, controller) {
          scope.$watch("shouldLoadMenu", function (shouldLoadMenu) {
            console.log("shouldLoadMenu has changed to: " + shouldLoadMenu);

            if (shouldLoadMenu) {
              var user = SessionService.getCurrentUser();
              scope.user = user.first_name + ' ' + user.last_name

              CommunityService.getCommunityStats().then(function(stats) {
                scope.stats = stats;
              });
            }
          });
        }
      }
  }]);
