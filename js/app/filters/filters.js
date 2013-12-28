define(['app/TestNodeController'],
    function(TestNodeController) {
        'use strict';
        angular.module('TestNodeController.filters')
        .filter('nodeStatusFilter', ["$rootScope",
            function($rootScope) {
                return function(input) {
                    return $.isNumeric(input) ? $rootScope.NodeStatusEnum.getEnumItem(input).Label : '';
                };
            }
        ]).filter('taskStatusFilter', ["$rootScope",
            function($rootScope) {
                return function(input) {
                    return $.isNumeric(input) ? $rootScope.TaskStatusEnum.getEnumItem(input).Label : '';
                };
            }
        ]).filter('projectNameFilter', ["$rootScope",
            function($rootScope) {
                return function(input) {
                    return $.isNumeric(input) ? $rootScope.ProjectNameEnum.getEnumItem(input).Label : '';
                };
            }
        ]).filter('taskTypeFilter', ["$rootScope",
            function($rootScope) {
                return function(input) {
                    return $.isNumeric(input) ? $rootScope.TaskTypeEnum.getEnumItem(input).Label : '';
                };
            }
        ]).filter('svnUrlFilter', ["$rootScope",
            function($rootScope) {
                return function(input) {
                    return (input && (input.length > 0)) ? input.replace(/https?:\/\/v(\-sh)?\-svn/g, '') : '';
                };
            }
        ]);
    }
);