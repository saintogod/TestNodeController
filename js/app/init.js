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
            connectWith: "#testnodelist"
        });
        $(".list-item").addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
            .find(".item-header")
            .addClass("ui-widget-header ui-corner-all")
            .end();

        $(".item-header .ui-icon").click(function() {
            $(this).toggleClass("ui-icon-minusthick").toggleClass("ui-icon-plusthick");
            $(this).parents(".list-item:first").find(".item-content, .item-footer").toggle();
        });

        $("#testnodelist").disableSelection();

        return angular.module('TestNodeController', ['TestNodeController.controllers', 'TestNodeController.directives']);
    });