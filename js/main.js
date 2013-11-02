require.config({
    baseUrl: 'js',
    paths: {
        jquery      : 'lib/jquery/jquery-1.10.2',
        bootstrap   : 'lib/bootstrap/bootstrap',
        angular     : 'lib/angular/angular',
        modernizr   : 'lib/modernizr/modernizr.custom.js',
        jqueryui    : 'lib/jquery/plugins/jquery-ui/jquery-ui-1.10.3.custom',
        jnotify     : 'lib/jquery/plugins/jquery-notify/jnotify',
        jlayout     : 'lib/jquery/plugins/jquery-layout/jquery.layout-latest',
        jminimalect : 'lib/jquery/plugins/jquery-minimalect/jquery.minimalect'
    },
    shim: {
        "jquery"        : { exports: '$' },
        "bootstrap"     : { deps: ["jquery"] },
        "jqueryui"      : { deps: ["jquery"], exports: "jqueryui" },
        "jnotify"       : { deps: ["jquery"], exports: "jnotify" },
        "jlayout"       : { deps: ["jquery", "jqueryui"], exports: "jlayout" },
        "jminimalect"   : { deps: ["jquery"] },
        "angular"       : { exports: "angular" }
    },
    priority: [
        "jquery",
        "angular"
    ]
});

// hey Angular, we're bootstrapping manually!
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
    'jquery',
    'angular',
    'app/init'
], function($, angular, init, site, searchbox) {
    'use strict';
    var $html = angular.element(document.getElementsByTagName('html')[0]);

    angular.element().ready(function() {
        $html.addClass('ng-app');
        angular.bootstrap($html, [init['name']]);
        //angular.bootstrap(angular.element($('#searchpanel')),)
    });
});
