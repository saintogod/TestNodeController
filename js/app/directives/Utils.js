define(['jquery', 'angular','app/TestNodeController'],
    function($, angular, TestNodeController) {
        'use strict';
        angular.module('TestNodeController.directives')
            .directive('tncSearchBox', function() {
                return {
                    restrict: 'E',
                    scope: {},
                    replace: true,
                    transclude: true,
                    templateUrl: '/html/partials/search-box.html',
                    controller: function($scope) {
                        $scope.searchText = '';
                        $scope.search = function() {
                            $("#searchresult").fadeIn(30).fadeOut(5000);
                        };
                    },
                    link: function(scope, element, attrs) {

                    }
                };
            }).directive('onEnter', function() {
                return function(scope, element, attrs) {
                    element.bind("keydown keypress", function(event) {
                        if (event.which === 13) {
                            scope.$apply(function() {
                                scope.$eval(attrs.onEnter);
                            });
                            event.preventDefault();
                        }
                    });
                    element.bind("focusin", function(event) {
                        $('#searchpanel').stop(true, true).animate({width: "60%"}, 600);
                    }).bind("focusout", function(event) {
                        $('#searchpanel').stop(true, true).animate({width: "35%"}, 600);
                    });
                };
            }).directive('emailList', function() {
                return {
                    restrict: 'AE',
                    replace: true,
                    scope:{
                        base:'&',
                        emailList: '=ngModel'
                    },
                    templateUrl: '/html/partials/email-list.html',
                    controller: function($scope){
                        $scope.addEmail = function(emails) {
                            $.each(emails, function(index, email) {
                                if(email){
                                    var fullEmailAddr = email + $scope.base;
                                    if($.inArray(fullEmailAddr, $scope.emailList) === -1)
                                        $scope.emailList.push(fullEmailAddr);
                                }
                            });
                        };
                        $scope.addNewEmail = function($event) {
                            if($event.keyCode == 13 && $scope.newEmail) {
                                $scope.addEmail($scope.newEmail.split(/(?:,| |;)+/));
                                $event.preventDefault();
                                $scope.newEmail = "";
                            }
                        };
                        $scope.addNewEmailClick = function(){
                            $scope.addEmail($scope.newEmail.split(/(?:,| |;)+/));
                            $scope.newEmail = "";
                        };
                    },
                    link: function($scope, element, attrs){
                        $scope.base = attrs.base || '@laserfiche.com';
                    }
                }
            });
    });