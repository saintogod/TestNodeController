require.config({
    baseUrl: 'js',
    paths: {
        jquery      : 'lib/jquery/jquery-1.10.2',
        bootstrap   : 'lib/bootstrap/bootstrap',
        angular     : 'lib/angular/angular',
        angularRoute: 'lib/angular/angular-route',
        angularCookies: 'lib/angular/angular-cookies',
        localStorage: 'lib/angular/plugins/angular.LocalStorage',
        modernizr   : 'lib/modernizr/modernizr.custom',
        jqueryui    : 'lib/jquery/plugins/jquery-ui/jquery-ui-1.10.3.custom',
        multisortable: 'lib/jquery/plugins/jquery-multisortable/jquery.multisortable',
        jnotify     : 'lib/jquery/plugins/jquery-notify/jquery.jnotify',
        jlayout     : 'lib/jquery/plugins/jquery-layout/jquery.layout-latest',
        jminimalect : 'lib/jquery/plugins/jquery-minimalect/jquery.minimalect',
        jslimscroll : 'lib/jquery/plugins/jquery-slimscroll/jquery.slimscroll',
        btswitch    : 'lib/bootstrap/plugins/bootstrap-switch/bootstrap-switch'
    },
    shim: {
        "modernizr"     : { exports: "modernizr" },
        "jquery"        : { exports: '$' },
        "angular"       : { exports: "angular" },
        "bootstrap"     : { deps: ["jquery"] },
        "btswitch"      : { deps: ["jquery", "bootstrap"] },
        "jqueryui"      : { deps: ["jquery"], exports: "jqueryui" },
        "multisortable" : { deps: ["jquery", "jqueryui"] },
        "jnotify"       : { deps: ["jquery"], exports: "jnotify" },
        "jlayout"       : { deps: ["jquery", "jqueryui"], exports: "jlayout" },
        "jminimalect"   : { deps: ["jquery"] },
        "jslimscroll"   : { deps: ["jquery"] },
        "angularRoute"  : { deps: ["angular"] },
        "angularCookies": { deps: ["angular"] },
        "localStorage"  : { deps: ["angular", "angularCookies"] }
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
    'modernizr',
    'bootstrap'
], function($, angular, init, modernizr) {
    'use strict';
    var $html = angular.element(document.getElementsByTagName('html')[0]);

    angular.element().ready(function() {
        $html.addClass('ng-app');
        angular.bootstrap($html, [init['name']]);
    });
});
