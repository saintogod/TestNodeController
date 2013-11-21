define(['angular', 'angularRoute', 'app/util', 'app/models/SharedObjects'],
    function (angular, ngRoute) {
    'use strict';
    angular.module('TestNodeController.services', []);
    angular.module('TestNodeController.controllers', ['TestNodeController.services']);
    angular.module('TestNodeController.directives', ['TestNodeController.services']);
    angular.module('TestNodeController.filters', ['TestNodeController.services']);
    var TestNodeController = angular.module('TestNodeController', ['ngRoute', 'TestNodeController.services', 'TestNodeController.filters', 'TestNodeController.controllers', 'TestNodeController.directives']);
    return TestNodeController;
});