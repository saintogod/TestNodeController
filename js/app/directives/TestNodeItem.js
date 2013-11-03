define(['jquery', 'angular', 'app/TestNodeController', 'jslimscroll'],
    function($, angular, TestNodeController) {
        'use strict';
        angular.module('TestNodeController.directives')
            .directive('testNodeItem', function() {
                return {
                    restrict: 'E',
                    scope: {},
                    replace: true,
                    transclude: true,
                    templateUrl: '/html/partials/search-box.html',
                    controller: function($scope) {
                        $scope.searchText = '';
                        $scope.search = function() {
                            $("#searchresult").fadeIn(30).fadeOut(5000);
                        };
                    },
                    link: function(scope, element, attrs) {

                    }
                };
            });
        });