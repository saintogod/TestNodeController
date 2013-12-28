define(['app/TestNodeController', 'app/models/SharedObjects', 'app/filters/filters', 'jnotify'], function(TestNodeController) {
    'use strict';
    TestNodeController.run(['$rootScope', '$storage',
        function($rootScope, $storage) {
            $.extend($rootScope, TNC);
            var defaultSiteSetting = {
                projectName: 0, /*LFFTS*/
                taskType: 2, /*build and test*/
                emailList: ["ting.sang@laserfiche.com"]
            };
            $storage.set('name', "sant");
            $rootScope.siteSetting = $.extend({}, defaultSiteSetting, $storage.get('siteSetting'));
            $rootScope.scriptList = ["script A","Script B","script C","Script D","script E","Script F","script H","Script I"];
        }
    ]);
    angular.module('TestNodeController.services').factory('CommonObject', [
        function() {
            return {};
        }
    ]).factory('$dialogService', ['$http', '$compile', '$rootScope',
        function($http, $compile, $rootScope) {
            var callback = function(dlgEle, context) {
                var scope = dlgEle.scope();
                scope.$context = context;
                scope.onShow(function() {
                    dlgEle.parent().addClass('in');
                });
                attachHandler(dlgEle);
            };
            var setDirty = function(selector, flag) {
                var form = $('form', selector).data('$formController');
                if (form) {
                    form.$dirty = flag;
                    for (var key in form) {
                        if (angular.isObject(form[key]) && angular.isDefined(form[key].$pristine)) {
                            form[key].$pristine = !flag;
                            form[key].$dirty = flag;
                        }
                    }
                }
            };
            var attachHandler = function(ele) {
                $(ele).off('click.dismiss.modal').on('click.dismiss.modal', '.close', function() {
                    $(ele).parent().removeClass('in');
                });
            };
            var dialogService = {
                show: function(selector, dialog, context) {
                    if ($(selector).length === 0) {
                        $http.get(TNC.ServerUrl + '/html/dialogs/' + dialog + '.html?q=' + Math.random())
                            .then(function(res) {
                                var dlgEle = $(res.data);
                                dlgEle.appendTo('body').wrap('<div class="window-overlay"></div>');
                                $compile(dlgEle)($rootScope);
                                callback(dlgEle, context);
                            }, function() {});
                    } else {
                        callback($(selector), context);
                    }
                    setDirty(selector, false);
                },
                hide: function(selector) {
                    $(selector).parent().removeClass('in');
                }
            };
            return dialogService;

        }
    ]).service('notify', [
        function(){
            var options = {
                delay: 8000,
                fadeSpeed: 600,
                sticky: true,
                showClose: true,
                closeLabel: "&times;" 
            };
            this.alert = function(msg){
                options.type = "info";
                $.jnotify(msg, options);
            }, this.error = function(msg) {
                options.type = "error";
                $.jnotify(msg, options);
            }, this.success = function(msg) {
                options.type = "success";
                $.jnotify(msg, options);
            }, this.warning = function(msg) {
                options.type = "warning";
                $.jnotify(msg, options);
            };
        }
    ]).service('TNCService', ['$rootScope',
        function($rootScope) {
            this.Name = "TNCService";
            this.NodeList = [{
                NodeName: 'v-sh-tn1',
                Status: 32
            }, {
                NodeName: 'v-sh-tn2',
                Status: 4
            }, {
                NodeName: 'v-sh-tn3',
                Status: 0
            }, {
                NodeName: 'v-sh-tn4',
                Status: 1
            }];
            this.CurrentTasks = [{
                NodeName: 'v-sh-tn1',
                UserName: "st",
                Status: -2,
                ProjectName: 8,
                TaskType: 2,
                SvnUrl: "http://v-sh-svn/lf/parts/Web Admin/Branch/FSETrunk",
                TestArgs: "Empty",
                Revision: 'HEAD',
                LfsoRevision: 'HEAD',
                StartTime: "2013/11/1 9:08:49 AM",
                FinishTime: "2013/11/11 9:08:49 AM",
                Archived: false,
                Logs: {"BuildLog":"http://buildlog.cm", "Output":"http://output.com", "HTMLResult": "http://htmlresult.com", "XMLResult":"http://xmlresult.com" },
                Messages: "Motorola held a special event today to reveal its new Moto G, a spiritual sibling to the Moto X and a way for the Google-owned smartphone maker to bring its vision of a customized mobile device future to even more consumers with much more affordable pricing. “Now we’re setting our sights on the world,” is how Motorola CEO Dennis Woodside put it during the event today. \r\nNoting that most people can’t afford a $500 or $600 phone today, Woodside said that the average worldwide is more around the $200 mark. Those phones offer really bad experiences, however, according to Woodside, using old tech that shows especially poorly when running modern apps. Woodside cited a Galaxy Fame phone as an example of a cheap device made poorly, and last-gen phones as the only other option. \r\n“We believe half a billion people deserve better,” Woodside said, before announcing the Moto G. The Moto G offers an experience that can even rival the Galaxy S4 and other modern top-end superphones according to Woodside. \r\nThe 4.5-inch display, with 720p, 329 PPI resolution is the “hero feature” of the phone, and it outperforms the iPhone 5s according to Motorola. It has a Qualcomm Snapdragon 400 1.2 GHz processor with 1GB of RAM, and offers “all-day” battery life. That means around 14 hours of talk time on 3G networks, vs. 10 claimed for the iPhone 5s. It ships with Android 4.3, and there’s a guaranteed upgrade coming to Android 4.4, by January of 2014."
            }, {
                NodeName: 'v-sh-tn2',
                UserName: "st",
                Status: 1,
                ProjectName: 8,
                TaskType: 2,
                SvnUrl: "http://v-sh-svn/lf/parts/Web Admin/Branch/FSETrunk",
                TestArgs: "Empty",
                Revision: 'HEAD',
                LfsoRevision: 'HEAD',
                StartTime: "2013/11/1 9:08:49 AM",
                FinishTime: "2013/11/11 9:08:49 AM",
                Archived: false,
                Logs: {"BuildLog":"http://buildlog.cm", "Output":"http://output.com", "HTMLResult": "http://htmlresult.com", "XMLResult":"http://xmlresult.com" },
                Messages: "Motorola held a special event today to reveal its new Moto G, a spiritual sibling to the Moto X and a way for the Google-owned smartphone maker to bring its vision of a customized mobile device future to even more consumers with much more affordable pricing. “Now we’re setting our sights on the world,” is how Motorola CEO Dennis Woodside put it during the event today. \r\nNoting that most people can’t afford a $500 or $600 phone today, Woodside said that the average worldwide is more around the $200 mark. Those phones offer really bad experiences, however, according to Woodside, using old tech that shows especially poorly when running modern apps. Woodside cited a Galaxy Fame phone as an example of a cheap device made poorly, and last-gen phones as the only other option. \r\n“We believe half a billion people deserve better,” Woodside said, before announcing the Moto G. The Moto G offers an experience that can even rival the Galaxy S4 and other modern top-end superphones according to Woodside. \r\nThe 4.5-inch display, with 720p, 329 PPI resolution is the “hero feature” of the phone, and it outperforms the iPhone 5s according to Motorola. It has a Qualcomm Snapdragon 400 1.2 GHz processor with 1GB of RAM, and offers “all-day” battery life. That means around 14 hours of talk time on 3G networks, vs. 10 claimed for the iPhone 5s. It ships with Android 4.3, and there’s a guaranteed upgrade coming to Android 4.4, by January of 2014."
            }, {
                NodeName: 'v-sh-tn4',
                UserName: "st",
                StartTime: "2013/11/1 9:08:49 AM",
                FinishTime: "2013/11/11 9:08:49 AM",
                Archived: false,
                Messages: "Motorola held a special event today to reveal its new Moto G, a spiritual sibling to the Moto X and a way for the Google-owned smartphone maker to bring its vision of a customized mobile device future to even more consumers with much more affordable pricing. “Now we’re setting our sights on the world,” is how Motorola CEO Dennis Woodside put it during the event today. \r\nNoting that most people can’t afford a $500 or $600 phone today, Woodside said that the average worldwide is more around the $200 mark. Those phones offer really bad experiences, however, according to Woodside, using old tech that shows especially poorly when running modern apps. Woodside cited a Galaxy Fame phone as an example of a cheap device made poorly, and last-gen phones as the only other option. \r\n“We believe half a billion people deserve better,” Woodside said, before announcing the Moto G. The Moto G offers an experience that can even rival the Galaxy S4 and other modern top-end superphones according to Woodside. \r\nThe 4.5-inch display, with 720p, 329 PPI resolution is the “hero feature” of the phone, and it outperforms the iPhone 5s according to Motorola. It has a Qualcomm Snapdragon 400 1.2 GHz processor with 1GB of RAM, and offers “all-day” battery life. That means around 14 hours of talk time on 3G networks, vs. 10 claimed for the iPhone 5s. It ships with Android 4.3, and there’s a guaranteed upgrade coming to Android 4.4, by January of 2014."
            }];
            this.PendingTasks = [];
            this.FinishedTasks = [];
            this.scriptList = ["script A","Script B"];
        }
    ]).factory('$gridFactory', ['$http', '$compile', '$rootScope',
        function($http, $compile, $rootScope) {

            var cellTemplates = {
                logsTemplate:  '<div class="ngCellText break-word" ng-class="col.colIndex()"><span ng-cell-text class="log-links"><a href="{{value}}" title={{key}} ng-repeat="(key, value) in COL_FIELD">{{key}}</a></span></div>',
                datetimeTempl: '<div class="ngCellText break-word" ng-class="col.colIndex()"><span ng-cell-text>{{COL_FIELD | date}}</span></div>'
            };
            var columnDefinition = {
                'NodeName': { field: 'NodeName', displayName: 'Node', groupable: true, pinnable: true, minWidth: 20, maxWidth: 100, width: 64 },
                'UserName': { field: 'UserName', displayName: 'User', groupable: true, pinnable: false, minWidth: 20, maxWidth: 100, width: 40 },
                'Status': { field: 'Status', displayName: 'Status', groupable: true, pinnable: false, cellFilter: 'taskStatusFilter', minWidth: 20, maxWidth: 100 },
                'ProjectName': { field: 'ProjectName', displayName: 'Project', groupable: true, pinnable: true, cellFilter: 'projectNameFilter', minWidth: 20, maxWidth: 80 },
                'TaskType': { field: 'TaskType', displayName: 'TaskType', groupable: true, pinnable: false, cellFilter: 'taskTypeFilter', minWidth: 20, maxWidth: 100 },
                'SvnUrl': { field: 'SvnUrl', displayName: 'SvnUrl', groupable: false, pinnable: true, cellFilter: 'svnUrlFilter', minWidth: 80, maxWidth: 170 },
                'TestArgs': { field: 'TestArgs', displayName: 'Args', groupable: false, pinnable: false, minWidth: 40, maxWidth: 170 },
                'Revision': { field: 'Revision', displayName: 'Revision', groupable: false, pinnable: false, minWidth: 20, maxWidth: 50 },
                'LfsoRevision': { field: 'LfsoRevision', displayName: 'LfsoRev', groupable: false, pinnable: false, minWidth: 20, maxWidth: 50 },
                'StartTime': { field: 'StartTime', displayName: 'StartTime', groupable: false, pinnable: false, cellTemplate: cellTemplates.datetimeTempl, minWidth: 40, maxWidth: 100, width: 87 },
                'FinishTime': { field: 'FinishTime', displayName: 'FinishTime', groupable: false, pinnable: false, cellTemplate: cellTemplates.datetimeTempl, minWidth: 40, maxWidth: 100, width: 87 },
                'Logs': { field: 'Logs', displayName: 'Logs', groupable: false, sortable: false, pinnable: false, cellTemplate: cellTemplates.logsTemplate, minWidth: 50, maxWidth: 200 },
                'Messages': { field: 'Messages', displayName: 'Messages', groupable: false, pinnable: false, minWidth: 50, maxWidth: 200 }
            };
            var gridColumnDefs = {
                'pendingTasksGrid': ['NodeName', 'UserName', 'ProjectName', 'TaskType', 'SvnUrl', 'TestArgs', 'Revision', 'LfsoRevision'],
                'finishedTasksGrid': ['NodeName', 'UserName', 'Status', 'ProjectName', 'TaskType', 'SvnUrl', 'TestArgs', 'Revision', 'LfsoRevision', 'StartTime', 'FinishTime', 'Logs', 'Messages']
            };
            var gridFactory = {
                getColumnsByColIds: function(colIds) {
                    return $.map(colIds, function(colId) { return columnDefinition[colId]; });
                },
                getColumnsByGridId: function(gridId) {
                    return gridFactory.getColumnsByColIds(gridColumnDefs[gridId]);
                }
                //Todo add a copy to each cell
            };
            return gridFactory;
        }
    ]);
});