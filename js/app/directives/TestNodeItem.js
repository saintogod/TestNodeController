define(['jquery', 'angular', 'app/TestNodeController', 'jslimscroll'],
    function($, angular, TestNodeController) {
        'use strict';
        angular.module('TestNodeController.directives')
            .directive('testNodeItem', function() {
                return {
                    restrict: 'EA',
                    scope: {},
                    replace: true,
                    transclude: true,
                    templateUrl: '/html/partials/test-node-item.html',
                    link: function(scope, element, attrs) {
                        scope.type = attrs.type;
                        element.addClass('ui-widget ui-widget-content ui-helper-clearfix ui-corner-all')
                            .find('item-header')
                            .addClass('ui-widget-header ui-corner-all')
                            .end()
                            .find(".item-header .ui-icon").click(function() {
                                $(this).toggleClass("ui-icon-minusthick").toggleClass("ui-icon-plusthick");
                                $(this).parents(".list-item:first").find(".item-content").toggle();
                            }).end();
                        element.find('#Messages').slimScroll({height: "88px"});
                    }
                };
            });
    });