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
        ]).controller('PendingTasksCtrl', ['$scope', '$rootScope', 'TNCService', 
            function($scope, $rootScope, TNCService) {
                $scope.columnDefs = [
                    { field: 'NodeName', displayName: 'Node', groupable:false},
                    { field: 'UserName', displayName: 'User', groupable:false},
                    //{ field: 'Status', displayName: 'Status', groupable:false},
                    { field: 'ProjectName', displayName: 'Project', groupable:false},
                    { field: 'TaskType', displayName: 'TaskType', groupable:false},
                    { field: 'SvnUrl', displayName: 'SvnUrl', groupable:false},
                    { field: 'TestArgs', displayName: 'TestArgs', groupable:false},
                    { field: 'Revision', displayName: 'Revision', groupable:false},
                    { field: 'LfsoRevision', displayName: 'LfsoRev', groupable:false}/*,
                    { field: 'StartTime', displayName: 'StartTime', groupable:false},
                    { field: 'FinishTime', displayName: 'FinishTime', groupable:false},
                    { field: 'Archived', displayName: 'Archived', groupable:false},
                    { field: 'Messages', displayName: 'Messages', groupable:false}*/
                ];
                $scope.CurrentTasks = TNCService.CurrentTasks;

                $scope.AddNewTask = function(scope) {
                    console.log('hele');
                };
                $scope.DeleteTasks = function(scope) {

                };
                $scope.CopyTask = function(scope) {

                };
                $scope.CloneTask = function(scope) {

                };
                $scope.Refresh = function(scope) {

                };
                $scope.gridOption = {
                    data: 'CurrentTasks',
                    columnDefs: 'columnDefs',
                    showColumnMenu: true,
                    showFilter: true,
                    showFooter: true,
                    showSelectionCheckbox: true,
                    toolbars: [{
                        id: 'Add',
                        label: 'Add',
                        title: 'Creat a new Test/Script Task',
                        disabled: function(scope) { return false; },
                        click: $scope.AddNewTask
                    }, {
                        id: 'Delete',
                        label: 'Delete',
                        title: 'Delete Task(s)',
                        disabled: function(scope) { return scope.selectedItemCount === 0; },
                        click: $scope.DeleteTasks
                    }, {
                        id: 'Copy',
                        label: 'Copy',
                        title: 'Copy the task content to create a new one',
                        disabled: function(scope) { return scope.selectedItemCount !== 1; },
                        click: $scope.CopyTask
                    }, {
                        id: 'Clone',
                        label: 'Clone',
                        title: 'Duplicate the selected tasks',
                        disabled: function(scope) { return scope.selectedItemCount === 0; },
                        click: $scope.CloneTask
                    }, {
                        id: 'Refresh',
                        label: 'Refresh',
                        title: 'Refresh',
                        disabled: function(scope) { return false; },
                        click: $scope.Refresh
                    }]
                };
            }
        ]).controller('FinishedTasksCtrl', ['$scope', '$rootScope', 'TNCService', 
            function($scope, $rootScope, TNCService) {
                $scope.columnDefs = [];
                $scope.CurrentTasks = TNCService.CurrentTasks;
                $scope.gridOption = { 
                    data: 'CurrentTasks'
                };
            }
        ]);
    });