define(['jquery', 'angular', 'app/TestNodeController'],
    function($, angular, TestNodeController) {
        'use strict';
        angular.module('TestNodeController.controllers').controller('ControllerPanelCtrl', ['$scope', '$dialogService',
            function($scope, $dialogService) {
                $scope.init = function() {
                    console.log('ControllerPanelCtrl inited');
                };
                $scope.lockMulti = function() {
                    $dialogService.show('#LockNodesDlg', 'lock-multi-node');
                };
                $scope.realseMulti = function() {};
                $scope.resetId = function() {
                    if(!confirm('Are you really want to reset the TaskId to 1?'))
                        return;
                    //TODO: WCF- to invoke service to reset the task id.
                };
                $scope.reloadStatus = function() {
                    //TODO: WCF-
                };
                $scope.createTask = function() {
                    $dialogService.show('#CreateTaskDlg', 'create-test-task');
                };
                $scope.setSite = function() {
                    $dialogService.show('#SiteSettingDlg', 'site-setting');
                };
                $scope.addNode = function(){
                    $dialogService.show('#AddNewTestNodeDlg', 'add-new-testnode');
                }
                $scope.init();
            }
        ]);
    });