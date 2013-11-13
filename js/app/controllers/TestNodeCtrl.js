define(['jquery', 'angular', 'app/TestNodeController'],
    function($, angular, TestNodeController) {
        'use strict';
        return angular.module('TestNodeController.controllers').controller('TestNodeCtrl', ['$scope',
            function($scope) {
                $scope.testNodeList = [{
                    testNode: {
                        NodeName: "v-sh-tn1",
                        Locked: true
                    },
                    testTask: {
                        Status: "Building",
                        UserName: "st",
                        ProjectName: "WA",
                        TaskType: "Build And Test",
                        SvnUrl: "http://v-sh-svn/lf/parts/Web Admin/Branch/FSETrunk",
                        TestArgs: "Empty",
                        StartTime: "2013/11/1 9:08:49 AM",
                        FinishTime: "",
                        Messages: "Motorola held a special event today to reveal its new Moto G, a spiritual sibling to the Moto X and a way for the Google-owned smartphone maker to bring its vision of a customized mobile device future to even more consumers with much more affordable pricing. “Now we’re setting our sights on the world,” is how Motorola CEO Dennis Woodside put it during the event today. \
Noting that most people can’t afford a $500 or $600 phone today, Woodside said that the average worldwide is more around the $200 mark. Those phones offer really bad experiences, however, according to Woodside, using old tech that shows especially poorly when running modern apps. Woodside cited a Galaxy Fame phone as an example of a cheap device made poorly, and last-gen phones as the only other option. \
“We believe half a billion people deserve better,” Woodside said, before announcing the Moto G. The Moto G offers an experience that can even rival the Galaxy S4 and other modern top-end superphones according to Woodside. \
The 4.5-inch display, with 720p, 329 PPI resolution is the “hero feature” of the phone, and it outperforms the iPhone 5s according to Motorola. It has a Qualcomm Snapdragon 400 1.2 GHz processor with 1GB of RAM, and offers “all-day” battery life. That means around 14 hours of talk time on 3G networks, vs. 10 claimed for the iPhone 5s. It ships with Android 4.3, and there’s a guaranteed upgrade coming to Android 4.4, by January of 2014."
                    }
                },{
                    testNode: {
                        NodeName: "v-sh-tn2",
                        Locked: true
                    },
                    testTask: {
                        Status: "Building",
                        UserName: "st",
                        ProjectName: "WA",
                        TaskType: "Build And Test",
                        SvnUrl: "http://v-sh-svn/lf/parts/Web Admin/Branch/FSETrunk",
                        TestArgs: "Empty",
                        StartTime: "2013/11/1 9:08:49 AM",
                        FinishTime: "",
                        Messages: "Motorola held a special event today to reveal its new Moto G, a spiritual sibling to the Moto X and a way for the Google-owned smartphone maker to bring its vision of a customized mobile device future to even more consumers with much more affordable pricing. “Now we’re setting our sights on the world,” is how Motorola CEO Dennis Woodside put it during the event today. \
Noting that most people can’t afford a $500 or $600 phone today, Woodside said that the average worldwide is more around the $200 mark. Those phones offer really bad experiences, however, according to Woodside, using old tech that shows especially poorly when running modern apps. Woodside cited a Galaxy Fame phone as an example of a cheap device made poorly, and last-gen phones as the only other option. \
“We believe half a billion people deserve better,” Woodside said, before announcing the Moto G. The Moto G offers an experience that can even rival the Galaxy S4 and other modern top-end superphones according to Woodside. \
The 4.5-inch display, with 720p, 329 PPI resolution is the “hero feature” of the phone, and it outperforms the iPhone 5s according to Motorola. It has a Qualcomm Snapdragon 400 1.2 GHz processor with 1GB of RAM, and offers “all-day” battery life. That means around 14 hours of talk time on 3G networks, vs. 10 claimed for the iPhone 5s. It ships with Android 4.3, and there’s a guaranteed upgrade coming to Android 4.4, by January of 2014."
                    }
                }];
                $scope.pendinTaskList = [];
                $scope.finishedTaskList = [];
                $scope.scriptList = [];
                $scope.init = function() {

                };
                $scope.getData = function() {
                    var success = function(data) {

                    }, fail = function(msg) {

                        };
                };
                $scope.reload = function() {

                };
                $scope.init();
            }
        ]);
    });