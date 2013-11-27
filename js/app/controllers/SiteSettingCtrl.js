define(['app/TestNodeController', 'app/services/services', 'app/directives/TestNodeSelector'],
    function(TestNodeController) {
        'use strict';

        angular.module('TestNodeController.controllers').controller('SiteSettingCtrl', ['$scope', '$rootScope', '$dialogService', '$storage', '$timeout', 
            function($scope, $rootScope, $dialogService, $storage, $timeout) {
                $scope.init = function() {
                    $scope.settings = $.extend({}, $rootScope.siteSetting);
                };
                $scope.onShow = function(cb) {
                    cb();
                    $scope.init();
                };
                $scope.reset= function(){
                    $scope.init();
                };
                $scope.save = function(){
                    $storage.set('siteSetting', $scope.settings);
                    $rootScope.siteSetting = $scope.settings;
                    $dialogService.hide('#SiteSettingDlg');
                };
                $scope.cancel = function(){
                    $dialogService.hide('#SiteSettingDlg');
                };
            }
        ]);
    }
);