'use strict';

var app = angular.module('pivot', ['pivot.services','charts.wordCloud']);


    app.controller('IndexCtrl', function ($scope,$location,tweets,queryBuilder,$timeout,wordCloud) {
        $scope.searchText = $location.path().substr(1);
        $scope.prevSize = '6';

        $scope.search = function () {
           return tweets.search($scope.searchText,$scope.prevSize);
        };

        $scope.realTimeTweets = function () {
          return tweets.realTimeTweets($scope.searchText,$scope.prevSize);
        }

        $scope.addSearchString = function (searchString) {
            if ($scope.searchText.length === 0) { $scope.searchText = searchString; }
            else if ($scope.searchText.indexOf(searchString) === -1) { $scope.searchText += " " + searchString; }
            $scope.$apply();  // Term should appear immediately, not only after search returns
            $scope.realTimeTweets();
        };

       $scope.$watch('searchText', function(value){
           if(value != undefined) { 
             return tweets.realTimeTweets($scope.searchText,$scope.prevSize);
            } 
        });

        tweets.registerCallback(function (t) {
        	$timeout(function() {
              $scope.$apply(function(){
                 //$scope.searchResults.unshift(t); 
                 $scope.searchResults = t;
              });
            })
        });
});

 app.controller('NavigationCtrl', function($scope,$location) {
      $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
      };
 });   