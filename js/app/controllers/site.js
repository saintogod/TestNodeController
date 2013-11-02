define(['jquery','angular'], function ($, angular) {
    'use strict';
    return angular.module('ScriptPage.controllers',[]).controller('MainContainerCtrl', ['$scope',
        function($scope){
            $scope.init = function(){
                //alert('in angular');
            };
            $scope.init();
        }
    ]);
});
   
