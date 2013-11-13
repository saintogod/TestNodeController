define(['jquery', 'angular', 'app/TestNodeController'],
    function($, angular, TestNodeController) {
        'use strict';
        return angular.module('TestNodeController.controllers').controller('TestNodeItemCtrl', ['$scope',
            function($scope) {
                $scope.init = function() {
                   $scope.testNode = $scope.content.testNode;
                   $scope.testTask = $scope.content.testTask;
                };
                $scope.init();
            }
        ]);
    });