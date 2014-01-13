define(['app/TestNodeController', 'app/services/services'],
    function(TestNodeController) {
        'use strict';
        angular.module('TestNodeController.controllers').controller('TestNodeCtrl', ['$scope', '$rootScope', '$dialogService', 'TNCService',
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
        ]).controller('AddNewTestNodeCtrl', ['$scope', '$rootScope', '$dialogService', 'TNCService',
            function($scope, $rootScope, $dialogService, TNCService){
                $scope.init = function(){
                    console.log('AddNewTestNodeCtrl inited');
                };
                $scope.onShow = function(cb) {
                    cb();
                    $scope.init();
                };
                $scope.cancel = function(){
                    $dialogService.hide('#AddNewTestNodeDlg');
                };
                $scope.save = function(){
                    //TODO: WCF- add new node
                };
                $scope.reset = function(){
                    $scope.node.address = '';
                    $scope.node.enableExecuteTask = false;
                    $scope.autoLock = false;
                    $scope.userName = '';
                };
            }
        ]).controller('LockNodesCtrl', ['$scope', '$rootScope', '$dialogService', 'TNCService',
            function($scope, $rootScope, $dialogService, TNCService){
                $scope.singleNodeMode = false;
                $scope.init = function() {
                    $scope.TestNodes = $.map($rootScope.TestNodeList, function(item, index){
                        return {name: item.NodeName, disabled: item.Status !== 0, selected: item.Status > 0};
                    });
                    if($scope.$context){
                        $.each($scope.TestNodes, function(index, value){
                            if(value.name === $scope.$context.nodeId)
                                value.selected = true;
                        });
                        $scope.singleNodeMode = true;
                        console.log("Lock NodeId");
                    } else
                        console.log('LockNodesCtrl inited');
                };
                $scope.onShow = function(cb) {
                    cb();
                    $scope.init();
                };
                $scope.cancel = function(){
                    $dialogService.hide('#AddNewTestNodeDlg');
                };
                $scope.selectedNodes = function(){
                    return $.map($scope.TestNodes, function(item, index){if(item.selected && !item.disabled) return item.name;});
                };
                $scope.save = function(){
                    //TODO: WCF- add new node
                };
                $scope.reset = function(){
                    $scope.node.address = '';
                    $scope.node.enableExecuteTask = false;
                    $scope.autoLock = false;
                    $scope.userName = '';
                };
            }
        ]);
    });