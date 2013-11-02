define(['jquery','angular'], function ($, angular) {
    'use strict';
    return angular.module('ScriptPage.controllers',[]).controller('SearchBoxCtrl', ['$scope',
        function($scope){
            $scope.searchText = '';
            $scope.search = function() {
                $("#searchresult").fadeIn(30).fadeOut(5000);
            };
        }
    ]);
});