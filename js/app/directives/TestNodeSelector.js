define(['app/TestNodeController', 'jslimscroll'],
    function(TestNodeController) {
        'use strict';
        angular.module('TestNodeController.directives')
            .directive('testNodeSelector', function() {
                return {
                    restrict: 'EA',
                    scope: { },
                    replace: true,
                    transclude: false,
                    templateUrl: '/html/partials/test-node-selector.html',
                    controller:  function($scope, $rootScope, TNCService){
                        $scope.init = function(){
                            console.log("inside controller init");
                            $scope.testNodes = $.map($rootScope.TestNodeList, function(item, index) {
                                return {name: item.NodeName, selected: $scope.selectAll};
                            });
                        };
                    },
                    link: function(scope, element, attrs) {
                        scope.selectAll = eval(attrs.selectAll);
                        scope.runAtAny = eval(attrs.runAtAny);
                        scope.init();
                        var selAllEle = element.find('#select-all');
                        scope.$watch(function(){
                                var sum = 0;
                                $.each(scope.testNodes, function(index, item){
                                    sum += item.selected? 1: 0;
                                });
                                return sum;
                            }, function(newVal){
                                if(newVal === 0 ) {
                                    scope.selectAll = false;
                                    selAllEle.prop('indeterminate', false);
                                } else if(newVal === scope.testNodes.length) {
                                    scope.selectAll = true;
                                    selAllEle.prop('indeterminate', false);
                                } else {
                                    scope.selectAll = false;
                                    selAllEle.prop('indeterminate', true);
                                }
                            }, true);
                        selAllEle.change(function(){
                            $.each(scope.testNodes, function(index, item){
                                item.selected = !scope.selectAll;
                            });
                            scope.$apply();
                        });
                        $('.need-tooltip').tooltip();
                    }
                };
            });
    });