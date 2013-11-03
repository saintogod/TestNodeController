define(['jquery', 'angular','app/TestNodeController'],
    function($, angular, TestNodeController) {
        'use strict';
        angular.module('TestNodeController.directives')
            .directive('tncSearchBox', function() {
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
            }).directive('onEnter', function() {
                return function(scope, element, attrs) {
                    element.bind("keydown keypress", function(event) {
                        if (event.which === 13) {
                            scope.$apply(function() {
                                scope.$eval(attrs.onEnter);
                            });
                            event.preventDefault();
                        }
                    });
                    element.bind("focusin", function(event) {
                        $('#searchpanel').animate({width: "60%"}, 600);
                    }).bind("focusout", function(event) {
                        $('#searchpanel').animate({width: "35%"}, 600);
                    });
                };
            });
    });