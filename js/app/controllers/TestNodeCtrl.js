define(['app/TestNodeController', 'app/services/services'],
    function(TestNodeController) {
        'use strict';
        return angular.module('TestNodeController.controllers').controller('TestNodeCtrl', ['$scope', '$rootScope', '$dialogService', 'TNCService',
            function($scope, $rootScope, $dialogService, TNCService) {

                $scope.init = function() {
                    $scope.getData();
                };
                $scope.getData = function() {
                    var success = function(data) {
                        var RD = $.parseJSON(data).RD;
                        $scope.testNodeInfoList = [];
                        $rootScope.TestNodeList = RD.NodeList;
                        $.each(RD.NodeList, function(i, node) {
                            var nodeInfo = {
                                testNode: TNC.TestNode.cloneFrom(node),
                                testTask: TNC.TestTask.cloneFrom($.grep(RD.CurrentTasks, function(item) { return item.NodeName === node.NodeName; })[0])
                            };
                            $scope.testNodeInfoList.push(nodeInfo);
                        });
                        $rootScope.PendingTaskList = RD.PendingTasks.clone();
                        $rootScope.FinishedTaskList = RD.FinishedTasks.clone();
                        $scope.$apply();
                    }, fail = function(msg) {
                        console.log(msg);
                    };
                    var deferred = $.Deferred();
                    setTimeout(function() {
                        deferred.resolve(JSON.stringify({
                            RD: {
                                NodeList: TNCService.NodeList,
                                CurrentTasks: TNCService.CurrentTasks,
                                PendingTasks: TNCService.PendingTasks,
                                FinishedTasks: TNCService.FinishedTasks
                            }
                        }));
                    }, 200);
                    deferred.then(success, fail);
                };
                $scope.reload = function() {

                };
                $scope.init();
            }
        ]);
    });