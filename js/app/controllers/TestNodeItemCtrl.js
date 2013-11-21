define(['app/TestNodeController', 'app/services/services'],
    function(TestNodeController) {
        'use strict';
        angular.module('TestNodeController.controllers').controller('TestNodeItemCtrl', ['$scope', '$rootScope', 'TNCService',
            function($scope, $rootScope, TNCService) {
                $scope.init = function() {
                   $scope.testNode = $scope.$parent.nodeInfo.testNode;
                   $scope.testTask = $scope.$parent.nodeInfo.testTask;
                };
                $scope.lockBtnText = function() {
                    return $scope.testNode.Status.equals($rootScope.NodeStatusEnum.Idle, $rootScope.NodeStatusEnum.Unavailable) ? "Lock" : "Release";
                };
                $scope.disableLock = function() {
                    return !$scope.testNode.Status.equals($rootScope.NodeStatusEnum.Idle, $rootScope.NodeStatusEnum.Finished);
                };
                $scope.showRunAgain = function() {
                    return $scope.testNode.Status.equals($rootScope.NodeStatusEnum.Finished);
                };
                $scope.showRunFailed = function() {
                    return $scope.testNode.Status.equals($rootScope.NodeStatusEnum.Finished) && $scope.testTask.Status.equals($rootScope.TaskStatusEnum.TestFailed);
                };
                $scope.getLockBtnTooltip = function() {
                    if($scope.testNode.Status.equals($rootScope.NodeStatusEnum.Offline))
                        return $rootScope.NodeStatusEnum.Offline.Description;
                    else if($scope.testNode.Status.equals($rootScope.NodeStatusEnum.Unavailable))
                        return "Lock this node";
                    else if($scope.testNode.Status.equals($rootScope.NodeStatusEnum.Preparing, $rootScope.NodeStatusEnum.Building, $rootScope.NodeStatusEnum.Testing, $rootScope.NodeStatusEnum.Scripting))
                        return "Task is running now, cannot Release the node.";
                    else if($scope.testNode.Status.equals($rootScope.NodeStatusEnum.Locked, $rootScope.NodeStatusEnum.Finished))
                        return "Release this node";
                };
                $scope.getStatusText = function() {
                    if($scope.testNode.Status.equals($rootScope.NodeStatusEnum.Finished))
                        return $scope.testTask.Status.Label;
                    else 
                        return $scope.testNode.Status.Label;
                };
                $scope.getItemCss = function() {
                    if($scope.testNode.Status.equals($rootScope.NodeStatusEnum.Finished)){
                        if($scope.testTask.Status.equals($rootScope.TaskStatusEnum.BuildFailed))
                            return "build-failed";
                        else if($scope.testTask.Status.equals($rootScope.TaskStatusEnum.TestFailed))
                            return "test-failed";
                        else if($scope.testTask.Status.equals($rootScope.TaskStatusEnum.Success))
                            return "success";
                    }
                };
                $scope.init();
            }
        ]);
    });