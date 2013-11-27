define(['angular', 'angularRoute', 'localStorage', 'app/util', 'app/models/SharedObjects'],
    function (angular, ngRoute) {
    'use strict';
    angular.module('TestNodeController.services', ['localStorage']);
    angular.module('TestNodeController.controllers', ['TestNodeController.services', 'localStorage']);
    angular.module('TestNodeController.directives', ['TestNodeController.services', 'localStorage']);
    angular.module('TestNodeController.filters', ['TestNodeController.services', 'localStorage']);
    var TestNodeController = angular.module('TestNodeController', ['ngRoute', 'localStorage', 'TestNodeController.services', 'TestNodeController.filters', 'TestNodeController.controllers', 'TestNodeController.directives']);
    return TestNodeController;
});