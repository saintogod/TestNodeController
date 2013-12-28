define(['app/util'], function () {
    'use strict';
    (function(window) {
        var serverUrl = window.location.origin;
        var EnumObj = {
            getEnumItem: function(value) {
                for(var key in this){
                    var enumItem = this[key];
                    if($.isNumeric(value) && enumItem.Value === parseInt(value, 10) || $.isString(value) && enumItem.Label === value)
                        return enumItem;
                }
                return null;
            },
            compageItems: function(itemL, itemR){
                for(var attr in itemL)
                    if(itemL[attr] !== itemR[attr])
                        return false;
                return true;
            },
            toEnumList: function(){
                var list = [];
                for (var key in this) {
                    if (typeof this[key] !== "function") {
                        list.push(this[key]);
                    }
                }
                return list;
            }
        };

        var EnumItem = {
            equals: function(enumItem) {
                if(arguments.length === 0)
                    return false;
                else if(arguments.length === 1)
                    return this.Value === enumItem.Value;
                else {
                    for(var i = 0; i < arguments.length; i++)
                        if(this.Value === arguments[i].Value)
                            return true;
                }
            }
        };
        /**
         * Status of TestNode
         * @type {Object}
         */
        var NodeStatusEnum = {
            Offline:    { Value: -2, Label: "Off-line",     Description: "This node is currently off-line, please check networks." },
            Unavailable:{ Value: -1, Label: "Unavailable",  Description: "Can't start FinalBuilder on this node, please make sure FinalBuilder had been installed on this node, and the FinalBuilder is not running currently." },
            Idle:       { Value:  0, Label: "Idle",         Description: "You can use this node now!" },
            Locked:     { Value:  1, Label: "Locked",       Description: "This node is locked by some one manually, not locked by task." },
            Preparing:  { Value:  2, Label: "Preparing",    Description: "This test task has been assigned to this node, it may need a little time to prepare the environment." },
            Building:   { Value:  4, Label: "Building",     Description: "This node is building the projects right now." },
            Testing:    { Value:  8, Label: "Testing",      Description: "This node is running the NUnit tests right now." },
            Scripting:  { Value: 16, Label: "Scripting",    Description: "This node is executing scripts right now." },
            Finished:   { Value: 32, Label: "Finished",     Description: "All the tasks on this node has been down, please check the logs to get the detail." }
        };
        for(var key in NodeStatusEnum)
            $.extend(NodeStatusEnum[key], EnumItem);
        $.extend(NodeStatusEnum, EnumObj);
        /**
         * The status of TestTask.
         * @type {Object}
         */
        var TaskStatusEnum = {
            Pending:    { Value:  0, Label: "Pending" },
            Building:   { Value:  1, Label: "Building" },
            Testing:    { Value:  2, Label: "Testing" },
            Scripting:  { Value:  4, Label: "Running Script" },
            BuildFailed:{ Value: -1, Label: "Build Failed" },
            TestFailed: { Value: -2, Label: "Test Failed" },
            Success:    { Value:  8, Label: "Finished Success" }
        };
        for(var key in TaskStatusEnum)
            $.extend(TaskStatusEnum[key], EnumItem);
        $.extend(TaskStatusEnum, EnumObj);
        /**
         * Current in using Project name.
         * @type {Object}
         */
        var ProjectNameEnum = {
            LFFTS:  { Value:  0, Label: "LFFTS",    FullName: "Laserfiche Full-Texture Search Server" },
            FSE:    { Value:  1, Label: "FSE",      FullName: "Featured Search Engine" },
            SA:     { Value:  2, Label: "SA",       FullName: "Server Access" },
            RA:     { Value:  4, Label: "RA",       FullName: "Repository Access" },
            WA:     { Value:  8, Label: "WA",       FullName: "Web Administrator Console" },
            SCRIPT: { Value: 16, Label: "Script",   FullName: "Node Management Script"}
        };
        for(var key in ProjectNameEnum)
            $.extend(ProjectNameEnum[key], EnumItem);
        $.extend(ProjectNameEnum, EnumObj);
        /**
         * TaskType
         * @type {Object}
         */
        var TaskTypeEnum = { 
            None:   { Value:  0, Label: "Invalid" },
            Build:  { Value:  1, Label: "Only Build" },
            Test:   { Value:  2, Label: "Build & Test" },
            Script: { Value:  4, Label: "Execute Script" }
        };
        for(var key in TaskTypeEnum)
            $.extend(TaskTypeEnum[key], EnumItem);
        $.extend(TaskTypeEnum, EnumObj);
        TaskTypeEnum.toEnumList = function() {
            var list = [];
            for (var key in this) {
                if (typeof this[key] !== "function" && this[key].Value > 0) {
                    list.push(this[key]);
                }
            }
            return list;
        };

        var TestNode = function(name, status){
            this.NodeName = name;
            this.Status = NodeStatusEnum.getEnumItem(status);
        };
        TestNode.fromeJSON = function(str) {
            var tn = $.evalJSON(str);
            tn.translate();
            return tn;
        };
        TestNode.cloneFrom = function(tn) {
            var testNode = new TestNode(tn.NodeName, tn.Status);
            testNode.translate();
            return testNode;
        };
        TestNode.prototype = {
            toJson: function() {
                var serObj = this;
                serObj.Status = this.Status.Value;
                return $.toJSON(serObj);
            },
            translate: function() {
                if ($.isNumeric(this.Status))
                    this.Status = NodeStatusEnum.getEnumItem(this.Status);
            }
        };

        var TestTask = function(nodeName, userName, status, projectName, taskType, svnUrl, testArgs, revision, lfsoRevision, startTime, finishTime, archived, logs, messages){
            this.NodeName = nodeName;
            this.UserName = userName;
            this.Status = TaskStatusEnum.getEnumItem(status);
            this.ProjectName = ProjectNameEnum.getEnumItem(projectName);;
            this.TaskType = TaskTypeEnum.getEnumItem(taskType);
            this.SvnUrl = svnUrl;
            this.TestArgs = testArgs || "";
            this.Revision = revision || "HEAD";
            this.LfsoRevision = lfsoRevision || "HEAD";
            this.StartTime = startTime;
            this.FinishTime = finishTime;
            this.Archived = archived || false;
            this.Logs = logs || {};
            this.Messages = messages || "";
        };
        TestTask.fromeJSON = function(str) {
            var tt = $.evalJSON(str);
            tt.translate();
            return tt;
        };
        TestTask.cloneFrom = function(tt) {
            if(typeof tt == "undefined" || tt.length === 0)
                return new TestTask();
            var testTask = new TestTask(tt.NodeName, tt.UserName, tt.Status, tt.ProjectName, tt.TaskType, tt.SvnUrl, tt.TestArgs, tt.Revision, tt.LfsoRevision, tt.StartTime, tt.FinishTime, tt.Archived, tt.Logs, tt.Messages);
            testTask.translate();
            return testTask;
        };
        TestTask.prototype = {
            toJson: function() {
                return $.toJSON(this);
            },
            translate: function() {
                if ($.isNumeric(this.Status))
                    this.Status = TaskStatusEnum.getEnumItem(this.Status);
                if ($.isNumeric(this.ProjectName))
                    this.ProjectName = ProjectNameEnum.getEnumItem(this.ProjectName);
                if ($.isNumeric(this.TaskType))
                    this.TaskType = TaskTypeEnum.getEnumItem(this.TaskType);
            }
        };
    
        window.TNC  = {
            ServerUrl: serverUrl,
            NodeStatusEnum: NodeStatusEnum,
            TaskStatusEnum: TaskStatusEnum,
            ProjectNameEnum: ProjectNameEnum,
            TaskTypeEnum: TaskTypeEnum,
            TestNode: TestNode,
            TestTask: TestTask
        };
    })(window);
});