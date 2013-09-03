'use strict';

angular.module('Prode.directives', ['jqm'])
  .directive('menuIcon', function(){
      return {
        restrict: 'A',
        templateUrl: 'app/partials/menu_icon.html',
        replace: true
      }
  })
  .directive('menu', [
    '$rootScope', 'SessionService', 'CommunityService', function($rootScope, SessionService, CommunityService){
      return {
        restrict: 'A',
        templateUrl: 'app/partials/menu.html',
        replace: true,
        link: function (scope, element, attrs, controller) {
          scope.$watch('shouldLoadMenu', function(shouldLoadMenu) {
            if (shouldLoadMenu) {
              var user = SessionService.getCurrentUser();
              scope.user = user.first_name + ' ' + user.last_name;
              scope.nickname = user.nick_name;
              scope.avatar_url = user.image_url;

              CommunityService.getCommunityStats().then(function(stats) {
                scope.stats = stats;
                SessionService.setCommunityStats(stats);
              });
            } else {
              scope.user = null;
              scope.nickname = null;
              scope.avatar_url = null;
              scope.stats = null;
            }
          });
        }
      }
  }]);
