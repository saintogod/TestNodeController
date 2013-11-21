define(['angular', 'app/TestNodeController', 'app/controllers/_controllers'],
    function(angular, TestNodeController) {
        'use strict';

        TestNodeController.config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
                $routeProvider.when('/NewTask', {
                    templateUrl: 'html/partials/CreateNewTask.html',
                    controller: 'CreateNewTaskCtrl'
                }).when('/NewScript', {
                    templateUrl: 'html/partials/CreateNewScriptTask.html',
                    controller: 'CreateNewScriptTaskCtrl'
                }).when('/Nodes/:NodeName/Lock', {
                    templateUrl: 'html/partials/LockOrRelease.html',
                    controller: 'CreateNewScriptTaskCtrl',
                    resolve: {
                        lockStatus: 'locked'
                    }
                }).otherwise({
                    redirectTo: '/'
                });
                $locationProvider.html5Mode(true);
            }
        ]);

    });