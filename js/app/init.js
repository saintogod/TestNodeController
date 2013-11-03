define(['jquery', 'angular', 'app/controllers/_controllers', 'app/directives/_directives', 'jlayout'],
    function($, angular) {
        'use strict';
        $('#container').layout({
            closable: false,
            resizable: false,
            slidable: false,
            spacing_open: 0,
            spacing_closed: 0,
            south__size: 24,
            north__size: 120,
            center__maxSize: 0
        });
        $("#testnodelist").sortable({
            handle:".item-dragger",
            connectWith: "#testnodelist"
        });

        return angular.module('TestNodeController', ['TestNodeController.controllers', 'TestNodeController.directives']);
    });