angular.module('app', ['ngGrid']);
angular.module('app').controller('ctrl', function($scope){
    $scope.cloumnDefs = [
        {field: 'NodeName', displayName: 'NodeName', groupable: true},
        {field:'UserName', displayName:'UserName', groupable: true},
        {field:'Status', displayName:'Status', groupable: false},
        {field:'ProjectName', displayName:'ProjectName', groupable: true},
        {field:'TaskType', displayName:'TaskType', groupable: false},
        {field:'SvnUrl', displayName:'SvnUrl', groupable: true},
        {field:'TestArgs', displayName:'TestArgs', groupable: false},
        {field:'Revision', displayName:'Revision', groupable: false},
        {field:'LfsoRevision', displayName:'LfsoRevision', groupable: false},
        {field:'StartTime', displayName:'StartTime', groupable: false},
        {field:'FinishTime', displayName:'FinishTime', groupable: false},
        {field:'Archived', displayName:'Archived', groupable: false},
        {field:'Messages', displayName:'Messages', groupable: false}];
    $scope.mydata = [{
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
            Messages: "Motorola held a special event today"
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
            Messages: "Motorola held a special event today to reveal "
        }, {
            NodeName: 'v-sh-tn4',
            UserName: "st",
            StartTime: "2013/11/1 9:08:49 AM",
            FinishTime: "2013/11/11 9:08:49 AM",
            Archived: false,
            Messages: "Motorola held a special event today to reveal "
        }];
    $scope.gridOptions = {
        columnDefs: 'cloumnDefs',
        data: 'mydata',
        rowHeight: '60',
        enableColumnResize: true,
        enableRowReordering: true,
        enableColumnReordering: true,
        showSelectionCheckbox: true,
        showFooter: true,
        showColumnMenu: true,
        multiSelect:false
    };
});