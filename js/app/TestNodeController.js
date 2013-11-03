define(['angular'], function (angular) {
    'use strict';
    angular.module('TestNodeController.controllers', []);
    angular.module('TestNodeController.services', []);
    angular.module('TestNodeController.directives', []);
    angular.module('TestNodeController.filters', []);
    return angular.module('TestNodeController', ['TestNodeController.services', 'TestNodeController.filters', 'TestNodeController.contollers', 'TestNodeController.directives']);
});