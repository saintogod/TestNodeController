define([
    'jquery',
    'angular',
    'app/controllers/site',
    'app/controllers/searchbox',
    'app/directives/directives', 'jlayout'], function ($, angular, site, searchbox, directives){
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
        $("#listcontainer").sortable({
            connectWith: "#listcontainer"
        });
        $(".list-item").addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
            .find(".item-header")
            .addClass("ui-widget-header ui-corner-all")
            .prepend("<span class='ui-icon ui-icon-minusthick'></span>")
            .end()
            .find(".item-content");

        $(".item-header .ui-icon").click(function() {
            $(this).toggleClass("ui-icon-minusthick").toggleClass("ui-icon-plusthick");
            $(this).parents(".list-item:first").find(".item-content, .item-footer").toggle();
        });

        $("#listcontainer").disableSelection();

        return angular.module('ScriptPage',[
                'ScriptPage.controllers',
                'ScriptPage.directives'
            ]);
});