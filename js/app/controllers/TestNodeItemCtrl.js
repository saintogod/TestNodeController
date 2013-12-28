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
        ]).controller('PendingTasksCtrl', ['$scope', '$rootScope', '$gridFactory', '$dialogService', 'TNCService',
            function($scope, $rootScope, $gridFactory, $dialogService, TNCService) {
                $scope.columnDefs = $gridFactory.getColumnsByGridId('pendingTasksGrid');
                $scope.CurrentTasks = TNCService.CurrentTasks;

                $scope.AddNewTask = function(scope) {
                    $dialogService.show('#CreateTaskDlg', 'create-test-task');
                };
                $scope.ModifyTask = function(scope) {
                    $dialogService.show('#CreateTaskDlg', 'create-test-task', scope.selectedItems[0]);
                };
                $scope.DeleteTasks = function(scope) {
                    if(!confirm("Delete them all?")){
                        return;
                    }
                    console.log('Delete');
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
                    showSelectionCheckbox: true,
                    showFooter: true,
                    footerRowHeight: 30,
                    enablePaging: true,
                    enableColumnResize: true,
                    pagingOptions: { pageSizes: [20, 50, 100], pageSize: 20, totalServerItems: 0, currentPage: 1 },
                    toolbars: [{
                        id: 'Add',
                        label: 'Add',
                        title: 'Creat a new Test/Script Task',
                        disabled: function(scope) { return false; },
                        click: $scope.AddNewTask
                    }, {
                        id: 'Modify',
                        label: 'Modify',
                        title: 'Modify Test/Script Task',
                        disabled: function(scope) { return scope.selectedItems.length !== 1; },
                        click: $scope.ModifyTask
                    }, {
                        id: 'Delete',
                        label: 'Delete',
                        title: 'Delete Task(s)',
                        disabled: function(scope) { return scope.selectedItems.length === 0; },
                        click: $scope.DeleteTasks
                    }, {
                        id: 'Clone',
                        label: 'Clone',
                        title: 'Duplicate the selected tasks',
                        disabled: function(scope) { return scope.selectedItems.length === 0; },
                        click: $scope.CloneTask
                    }, {
                        id: 'Refresh',
                        label: 'Refresh',
                        title: 'Refresh',
                        disabled: function(scope) { return false; },
                        click: $scope.Refresh
                    }]
                };
                $scope.$on('updatePendingTasks', function(gridData) {
                    $scope.CurrentTasks = gridData;
                    $scope.$apply();
                    console.log('I will update the grid');
                });
            }
        ]).controller('FinishedTasksCtrl', ['$scope', '$rootScope', '$gridFactory', 'TNCService',
            function($scope, $rootScope, $gridFactory, TNCService) {
                $scope.columnDefs = $gridFactory.getColumnsByGridId('finishedTasksGrid');
                $scope.CurrentTasks = TNCService.CurrentTasks;
                $scope.gridOption = { 
                    data: 'CurrentTasks',
                    columnDefs: 'columnDefs',
                    showColumnMenu: true,
                    showFilter: true,
                    showFooter: true,
                    enablePaging: true,
                    pagingOptions: { pageSizes: [20, 50, 100], pageSize: 20, totalServerItems: 0, currentPage: 1 },
                    multiSelect: false,
                    footerRowHeight: 30,
                    rowHeight: 60,
                    enableColumnResize: true,
                    enableColumnReordering: true,
                    enableRowSelection: true,
                    enableRowReordering: true
                };
            }
        ]);
    });