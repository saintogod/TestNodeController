define(['angular', 'ngRoute', 'localStorage', 'ngGrid', 'app/util'],
    function (angular, ngRoute) {
        'use strict';
        angular.module('TestNodeController.filters', ['localStorage']);
        angular.module('TestNodeController.services', ['TestNodeController.filters', 'localStorage']);
        angular.module('TestNodeController.controllers', ['TestNodeController.services', 'localStorage', 'ngGrid']);
        angular.module('TestNodeController.directives', ['TestNodeController.services', 'localStorage']);
        var TestNodeController = angular.module('TestNodeController', ['ngRoute', 'localStorage', 'TestNodeController.filters', 'TestNodeController.services', 'TestNodeController.controllers', 'TestNodeController.directives']);
        return TestNodeController;
    }
);