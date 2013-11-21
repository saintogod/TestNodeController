define(['app/TestNodeController', 'app/services/services', 'app/directives/TestNodeSelector'],
    function(TestNodeController) {
        'use strict';

        angular.module('TestNodeController.controllers').controller('CreateNewTaskCtrl', ['$scope', '$rootScope', 'TNCService',
            function($scope, $rootScope, TNCService) {
                $scope.usedby = "";
                $scope.projectName = '2';
                $scope.tasktype = 2;
                $scope.svnUrl = "";
                $scope.revision = "HEAD";
                $scope.lfsoRevision = "HEAD";
                $scope.args = "";
                $scope.message = "";
                $scope.init = function() {
                    if($scope.$context != undefined) {
                        angular.extend($scope, $scope.$context);
                    }
                };
                $scope.onShow = function(cb) {
                    cb();
                    $scope.init();
                };
                $scope.save = function() {

                };
                $scope.cancel = function() {
                    $dialogService.hide('#CreateTestTaskDlg');
                };
                $scope.testTypeFilter = function(item) {
                    return item.Value > 0;
                };
                $scope.$watch('svnUrl', function(newVal, oldVal) {
                    $scope.svnUrl = newVal.toLowerCase().replace(/'|"/, '').replace(/(%20)?\s+/g, '%20');
                });
            }
        ]);
    }
);