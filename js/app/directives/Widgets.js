define(['app/TestNodeController', 'jqueryui', 'multisortable', 'jslimscroll'],
    function(TestNodeController) {
        'use strict';
        angular.module('TestNodeController.directives')
            .directive('needTooltip', function() {
                return {
                    restrict: 'AC',
                    scope: { },
                    link: function(scope, element, attrs){
                        var pos = attrs.tooltipPos || "left"; 
                        $(element).tooltip({
                            position: { my: pos + " bottom-6", at: pos+ " top"},
                            tooltipClass: "custom-tooltip"
                        });
                    }
                }
            }).directive('dragableSelector', ['$rootScope', function($rootScope){
                return {
                    scope: {
                        'selectedItems': '=ngModel'
                    }, // {} = isolate, true = child, false/undefined = no change
                    restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
                    template: '<div id="sortable-script-list">'+
                                  '<div class="row">'+
                                    '<div class="col-md-6">'+
                                      '<input type="search" class="form-control" id="item-filter">'+
                                      '<span class="ui-icon-search"></span>'+
                                    '</div>'+
                                    '<div class="col-md-6" id="dragging-item-holder">'+
                                    '</div>'+
                                  '</div>'+
                                  '<div class="row">'+
                                    '<div class="col-md-6">'+
                                        '<div class="dragable-container">'+
                                          '<ul id="available-items" class="list-group">'+
                                            '<li ng-repeat="available in availableItems" class="list-group-item dragable-item">{{available}}</li>'+
                                          '</ul>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="col-md-6">'+
                                        '<div class="dragable-container">'+
                                          '<ul id="selected-items" class="list-group">'+
                                          '</ul>'+
                                        '</div>'+
                                    '</div>'+
                                  '</div>'+
                                '</div>',
                    replace: true,
                    controller: function($scope){
                        $scope.init = function(){
                            $scope.availableItems = $rootScope.scriptList;
                        };
                        $scope.reset = function(){
                            $scope.init();
                        };
                        $scope.init();
                    },
                    link: function($scope, element, attrs) {
                        $scope.repeatable = attrs.repeatable || false;

                        $('.dragable-container').slimScroll({
                            position: 'right',
                            height: '200px',
                            size: '8px'
                        });
                        $('ul.list-group').multisortable({
                            opacity: 0.6,
                            stop: function(){
                                $scope.selectedItems = $.map(element.find('#selected-items').find("li"), function(item, index){ return $(item).text(); });
                                $scope.$apply();
                            }
                        });

                        $("#available-items").sortable("option", "connectWith", "#selected-items");
                        $("#selected-items").sortable("option", "connectWith", "#available-items");
                    }
                };
            }]);
    });