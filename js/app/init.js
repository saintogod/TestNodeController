define(['app/TestNodeController', 'app/services/services', 'app/controllers/_controllers', 'app/directives/_directives', 'app/routes/routes', 'jlayout'],
    function(TestNodeController) {
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
        return TestNodeController;
    }
);