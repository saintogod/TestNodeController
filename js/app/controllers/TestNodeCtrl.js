define(['jquery','angular'], function ($, angular) {
    'use strict';
    return angular.module('TestNodeController.controllers',[]).controller('TestNodeCtrl', ['$scope',
        function($scope){
            $scope.init = function(){
                console.log('TestNodeCtrl init');
            };
            $scope.init();
        }
    ]);
});
   
