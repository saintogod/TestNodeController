define(['app/TestNodeController', 'app/services/services', 'app/directives/TestNodeSelector'],
    function(TestNodeController) {
        'use strict';

        angular.module('TestNodeController.controllers').controller('CreateNewTaskCtrl', ['$scope', '$rootScope', '$dialogService', 'TNCService', 'notify', 
            function($scope, $rootScope, $dialogService, TNCService, notify) {
                $scope.Usedby = "";
                $scope.ProjectName = 2;
                $scope.TaskType = 2;
                $scope.SvnUrl = "";
                $scope.Revision = "HEAD";
                $scope.LfsoRevision = "HEAD";
                $scope.Args = "";
                $scope.Message = "";
                $scope.EmailList = [];
                $scope.SelectedTestNodes =[];
                
                $scope.taskPane = "create-test-task";
                $scope.init = function() {
                    if($scope.$context) {
                        $scope.Usedby = $scope.$context.Usedby || "";
                        $scope.ProjectName = $scope.$context.ProjectName || 2;
                        $scope.TaskType = $scope.$context.TaskType || 2;
                        $scope.SvnUrl = $scope.$context.SvnUrl || "";
                        $scope.Revision = $scope.$context.Revision || "HEAD";
                        $scope.LfsoRevision = $scope.$context.LfsoRevision || "HEAD";
                        $scope.Args = $scope.$context.Args || "";
                        $scope.Message = $scope.$context.Message || "";
                        $scope.EmailList = $scope.$context.EmailList || [];

                        /*$.each($scope.$context, function(key, value){
                            $scope[key] = value;
                        });
                        setTimeout(function() {$scope.$apply();}, 1);*/
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
                            task.Usedby = $scope.Usedby;
                            task.ProjectName = $scope.ProjectName;
                            task.TaskType = $scope.TaskType;
                            task.SvnUrl = $scope.SvnUrl;
                            task.Revision = $scope.Revision;
                            task.LfsoRevision = $scope.LfsoRevision;
                            task.Args = $scope.Args;
                            task.Message = $scope.Message;
                            task.EmailList = $scope.EmailList;
                            break;
                        case "using-exist-script":
                            task.ScriptType = $scope.ScriptType;
                            task.Scripts = $scope.SelectedScripts;
                            break;
                        case "input-new-script":
                            task.ScriptType = $scope.ScriptType;
                            task.ScriptContent = $scope.ScriptContent;
                            break;
                        default:
                            return;
                    }
                    task.SelectedTestNodes = $scope.SelectedTestNodes;
                    //http
                    console.log(task);
                    var success = function(data){
                        $rootScope.$broadcast('updatePendingTasks', data);
                    }, fail = function(data){

                    };
                    notify.alert("success add the task");
                    $dialogService.hide('#CreateTaskDlg');
                };
                $scope.cancel = function() {
                    $dialogService.hide('#CreateTaskDlg');
                };
                $scope.reset = function() {

                };
                var scriptContents = [];
                $scope.$watch('ScriptType', function(newVal, oldVal) {
                    scriptContents[oldVal] = $scope.ScriptContent;
                    $scope.ScriptContent = scriptContents[newVal] || "";
                });
                $scope.$watch('SvnUrl', function(newVal, oldVal) {
                    if(newVal)
                        $scope.SvnUrl = newVal.toLowerCase().replace(/'|"/, '').replace(/(%20)?\s+/g, '%20');
                });
            }
        ]);
    }
);