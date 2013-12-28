define(['app/TestNodeController', 'app/directives/Widgets', 'jslimscroll','btswitch'],
    function(TestNodeController) {
        'use strict';
        angular.module('TestNodeController.directives')
            .directive('testNodeSelector', function() {
                return {
                    restrict: 'EA',
                    scope: { 
                        selectedTestNodes: '=',
                        runAtAny: '='
                    },
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
                        $scope.updateSelectedNodes = function(){
                            $scope.selectedTestNodes = $.merge($.map($scope.testNodes, function(item, index){ if(item.selected) return item.name; }), $scope.extraNodes.split(/[,;]/));
                        };
                    },
                    link: function($scope, element, attrs) {
                        $scope.selectAll = eval(attrs.selectAll);
                        $scope.init();
                        var selAllEle = element.find('#select-all');
                        $scope.$watch(function(){
                                var sum = 0;
                                $.each($scope.testNodes, function(index, item){
                                    sum += item.selected? 1: 0;
                                });
                                return sum;
                            }, function(newVal){
                                if(newVal === 0 ) {
                                    $scope.selectAll = false;
                                    selAllEle.prop('indeterminate', false);
                                } else if(newVal === $scope.testNodes.length) {
                                    $scope.selectAll = true;
                                    selAllEle.prop('indeterminate', false);
                                } else {
                                    $scope.selectAll = false;
                                    selAllEle.prop('indeterminate', true);
                                }
                            }, true);
                        selAllEle.change(function(){
                            $.each($scope.testNodes, function(index, item){
                                item.selected = !$scope.selectAll;
                            });
                            $scope.$apply();
                        });
                        $('.make-switch').bootstrapSwitch();
                        $('.make-switch').bootstrapSwitch('setState', $scope.runAtAny);
                        $('.make-switch').on('switch-change', function(e, data){
                            $scope.runAtAny = data.value;
                            $scope.$apply();
                        });
                    }
                };
            });
    });