require.config({
    baseUrl: 'js',
    paths: {
        jquery      : 'lib/jquery/jquery-1.10.2',
        bootstrap   : 'lib/bootstrap/bootstrap',
        angular     : 'lib/angular/angular',
        modernizr   : 'lib/modernizr/modernizr.custom',
        jqueryui    : 'lib/jquery/plugins/jquery-ui/jquery-ui-1.10.3.custom',
        jnotify     : 'lib/jquery/plugins/jquery-notify/jnotify',
        jlayout     : 'lib/jquery/plugins/jquery-layout/jquery.layout-latest',
        jminimalect : 'lib/jquery/plugins/jquery-minimalect/jquery.minimalect',
        jslimscroll :  'lib/jquery/plugins/jquery-slimscroll/jquery.slimscroll'
    },
    shim: {
        "jquery"        : { exports: '$' },
        "bootstrap"     : { deps: ["jquery"] },
        "jqueryui"      : { deps: ["jquery"], exports: "jqueryui" },
        "jnotify"       : { deps: ["jquery"], exports: "jnotify" },
        "jlayout"       : { deps: ["jquery", "jqueryui"], exports: "jlayout" },
        "jminimalect"   : { deps: ["jquery"] },
        "jslimscroll"   : { deps: ["jquery"] },
        "angular"       : { exports: "angular" },
        "modernizr"     : { exports: "modernizr" }
    },
    priority: [
        "jquery",
        "angular"
    ]
});

window.name = "NG_DEFER_BOOTSTRAP!";

require( [
    'jquery',
    'angular',
    'app/init',
    'modernizr'
], function($, angular, init, modernizr) {
    'use strict';
    var $html = angular.element(document.getElementsByTagName('html')[0]);

    angular.element().ready(function() {
        $html.addClass('ng-app');
        angular.bootstrap($html, [init['name']]);
    });
});
