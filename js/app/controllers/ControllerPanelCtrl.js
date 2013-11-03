define(['jquery', 'angular', 'app/TestNodeController'],
    function($, angular, TestNodeController) {
        'use strict';
        return angular.module('TestNodeController.controllers').controller('ControllerPanelCtrl', ['$scope',
            function($scope) {
                $scope.init = function() {
                    console.log('ControllerPanelCtrl inited');
                };
                $scope.init();
            }
        ]);
    });