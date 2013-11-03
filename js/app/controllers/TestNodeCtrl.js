define(['jquery', 'angular', 'app/TestNodeController'],
    function($, angular, TestNodeController) {
        'use strict';
        return angular.module('TestNodeController.controllers').controller('TestNodeCtrl', ['$scope',
            function($scope) {
                $scope.testNode = {
                    NodeName: "v-sh-tn1",
                    Locked: true
                };
                $scope.testTask = {
                    Status: "Building",
                    UserName: "st",
                    ProjectName: "WA",
                    TaskType: "Build And Test",
                    SvnUrl: "http://v-sh-svn/lf/parts/Web Admin/Branch/FSETrunk",
                    TestArgs: "Empty",
                    StartTime: "2013/11/1 9:08:49 AM",
                    FinishTime: "",
                    Messages: ""
                };
                $scope.init = function() {
                    console.log('TestNodeCtrl init');
                };
                $scope.init();
            }
        ]);
    });