define(['app/TestNodeController', 'app/services/services', 'app/directives/TestNodeSelector'],
    function(TestNodeController) {
        'use strict';

        angular.module('TestNodeController.controllers').controller('CreateNewTaskCtrl', ['$scope', '$rootScope', '$dialogService', 'TNCService',
            function($scope, $rootScope, $dialogService, TNCService) {
                $scope.usedby = "";
                $scope.projectName = '2';
                $scope.taskType = 2;
                $scope.svnUrl = "";
                $scope.revision = "HEAD";
                $scope.lfsoRevision = "HEAD";
                $scope.args = "";
                $scope.message = "";
                $scope.emailList = [];
                $scope.init = function() {
                    if($scope.$context != undefined) {
                        angular.extend($scope, $scope.$context);
                    }
                    $('a[data-toggle="tab"]').click(function (e) {
                        e.preventDefault();
                        $(this).tab('show');
                    });
                };
                $scope.onShow = function(cb) {
                    cb();
                    $scope.init();
                };
                $scope.save = function() {

                    $dialogService.hide('#CreateTaskDlg');
                };
                $scope.cancel = function() {
                    $dialogService.hide('#CreateTaskDlg');
                };
                $scope.reset = function() {

                };
                $scope.$watch('svnUrl', function(newVal, oldVal) {
                    if(newVal)
                        $scope.svnUrl = newVal.toLowerCase().replace(/'|"/, '').replace(/(%20)?\s+/g, '%20');
                });
            }
        ]);
    }
);