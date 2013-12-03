define(['app/TestNodeController', 'app/services/services', 'app/directives/TestNodeSelector'],
    function(TestNodeController) {
        'use strict';

        angular.module('TestNodeController.controllers').controller('CreateNewTaskCtrl', ['$scope', '$rootScope', '$dialogService', 'TNCService', 'notify', 
            function($scope, $rootScope, $dialogService, TNCService, notify) {
                $scope.usedby = "";
                $scope.projectName = '2';
                $scope.taskType = 2;
                $scope.svnUrl = "";
                $scope.revision = "HEAD";
                $scope.lfsoRevision = "HEAD";
                $scope.args = "";
                $scope.message = "";
                $scope.emailList = [];

                var scriptContents = [];
                $scope.taskPane = "create-test-task";
                $scope.init = function() {
                    if($scope.$context != undefined) {
                        angular.extend($scope, $scope.$context);
                    }
                    $('a[data-toggle="tab"]').click(function (e) {
                        e.preventDefault();
                        $scope.taskPane = $(this).attr('href').slice(1);
                        $scope.$apply();
                    });
                };
                $scope.onShow = function(cb) {
                    cb();
                    $scope.init();
                };
                $scope.save = function() {
                    var task ={};
                    var method = "";
                    switch($scope.taskPane){
                        case "create-test-task":
                            task.usedby = $scope.usedby;
                            task.projectName = $scope.projectName;
                            task.taskType = $scope.taskType;
                            task.svnUrl = $scope.svnUrl;
                            task.revision = $scope.revision;
                            task.lfsoRevision = $scope.lfsoRevision;
                            task.args = $scope.args;
                            task.message = $scope.message;
                            task.emailList = $scope.emailList;
                            break;
                        case "using-exist-script":
                            task.scriptType = $scope.scriptType;
                            task.scripts = $scope.selectedScripts;
                            break;
                        case "input-new-script":
                            task.scriptType = $scope.scriptType;
                            task.scriptContent = $scope.scriptContent;
                            break;
                        default:
                            return;
                    }
                    //http
                    console.log(task);
                    notify.alert("success add the task");
                    $dialogService.hide('#CreateTaskDlg');
                };
                $scope.cancel = function() {
                    $dialogService.hide('#CreateTaskDlg');
                };
                $scope.reset = function() {

                };
                $scope.$watch('scriptType', function(newVal, oldVal) {
                    scriptContents[oldVal] = $scope.scriptContent;
                    $scope.scriptContent = scriptContents[newVal] || "";
                });
                $scope.$watch('svnUrl', function(newVal, oldVal) {
                    if(newVal)
                        $scope.svnUrl = newVal.toLowerCase().replace(/'|"/, '').replace(/(%20)?\s+/g, '%20');
                });
            }
        ]);
    }
);