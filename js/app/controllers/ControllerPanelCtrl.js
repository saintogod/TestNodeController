define(['jquery', 'angular', 'app/TestNodeController'],
    function($, angular, TestNodeController) {
        'use strict';
        angular.module('TestNodeController.controllers').controller('ControllerPanelCtrl', ['$scope', '$dialogService',
            function($scope, $dialogService) {
                $scope.init = function() {
                    console.log('ControllerPanelCtrl inited');
                };
                $scope.lockMulti = function() {};
                $scope.realseMulti = function() {};
                $scope.resetId = function() {};
                $scope.reloadStatus = function() {};
                $scope.createTestTask = function() {
                    console.log('createTestTask');
                    $dialogService.show('#CreateTestTaskDlg', 'create-test-task');
                };
                $scope.init();
            }
        ]);
    });