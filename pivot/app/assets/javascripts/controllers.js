'use strict';

angular.module('pivot.controllers',['pivot.services']).
    controller('IndexCtrl', function ($scope,$location,tweets,queryBuilder,$timeout) {
        $scope.searchText = $location.path().substr(1);
        $scope.prevSize = '10';

        $scope.search = function () {
           return tweets.search($scope.searchText,$scope.prevSize);
        };

        tweets.registerCallback(function (t) {
        	$timeout(function() {
              $scope.$apply(function(){
                 $scope.searchResults = t;
              });
            })
        });
});