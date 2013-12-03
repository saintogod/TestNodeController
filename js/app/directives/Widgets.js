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
                    require: "ngModel",
                    scope: {
                        'selectedItems': '=ngModel'
                    }, // {} = isolate, true = child, false/undefined = no change
                    restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
                    template: '<div id="sortable-script-list">'+
                                  '<div class="row">'+
                                    '<div class="col-md-6">'+
                                      '<input type="search" class="form-control" id="item-filter" ng-model="itemFilter">'+
                                      '<span class="ui-icon-search"></span>'+
                                    '</div>'+
                                    '<div class="col-md-6" id="dragging-item-holder">'+
                                      '<span class="help-block" ng-show="selectedItems==undefined || selectedItems.size() === 0">Must select at least one script</span>'+
                                    '</div>'+
                                  '</div>'+
                                  '<div class="row">'+
                                    '<div class="col-md-6">'+
                                        '<div class="dragable-container">'+
                                          '<ul id="available-items" class="list-group">'+
                                            '<li ng-repeat="available in availableItems | filter: itemFilter" class="list-group-item dragable-item">{{available}}</li>'+
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
                    link: function($scope, element, attrs, ctrl) {
                        $scope.repeatable = attrs.repeatable || false;
                        ctrl.$parsers.unshift(function(value) {
                            // test and set the validity after update.
                            var valid = value && value.size() > 0;
                            ctrl.$setValidity('dragableSelector', valid);
                            
                            // if it's valid, return the value to the model, 
                            // otherwise return undefined.
                            return valid ? value : undefined;
                        });
                        
                        // add a formatter that will process each time the value 
                        // is updated on the DOM element.
                        ctrl.$formatters.unshift(function(value) {
                            // validate.
                            ctrl.$setValidity('dragableSelector', value && value.size() > 0);
                            
                            // return the value or nothing will be written to the DOM.
                            return value;
                        });
                        $('.dragable-container').slimScroll({
                            position: 'right',
                            height: '200px',
                            size: '8px'
                        });
                        $('ul.list-group').multisortable({
                            opacity: 0.6,
                            stop: function(){
                                $scope.selectedItems = $.map(element.find('#selected-items').find("li"), function(item, index){ return $(item).text(); });
                                $scope.$apply(function() {
                                    ctrl.$setViewValue($scope.selectedItems);
                                });
                            }
                        });

                        $("#available-items").sortable("option", "connectWith", "#selected-items");
                        $("#selected-items").sortable("option", "connectWith", "#available-items");
                    }
                };
            }]);
    });