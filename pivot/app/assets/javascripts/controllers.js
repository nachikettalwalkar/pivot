'use strict';

var app = angular.module('pivot', ['pivot.services','charts.wordcloud','charts.barchart','pivot.directives', 'google-maps']);


    app.controller('IndexCtrl', function ($scope,$location,tweets,queryBuilder,$timeout,wordcloud,barchart,wordCount) {
        $scope.searchText = $location.path().substr(1);
        $scope.prevSize = '500';
        $scope.live = true;
        $scope.words = [];

        /*$scope.search = function () {
           return tweets.search($scope.searchText,$scope.prevSize);
        };*/

 

         /** update UI every ten seconds to keep time ago for tweets accurate */
        var onTimeout = function () { updateTimeout = $timeout(onTimeout, 5000); };
        var updateTimeout = onTimeout();

       /* $scope.addSearchString = function (searchString) {
            if ($scope.searchText.length === 0) { $scope.searchText = searchString; }
            else if ($scope.searchText.indexOf(searchString) === -1) { $scope.searchText += " " + searchString; }
            $scope.$apply();  // Term should appear immediately, not only after search returns
            $scope.realTimeTweets();
        };*/

       /*$scope.$watch('searchText', function(value){
           if(value != undefined) { 
             return tweets.realTimeTweets($scope.searchText,$scope.prevSize);
            } 
        });*/

        tweets.registerCallback(function (t) {   
        	$timeout(function() {
              $scope.$apply(function(){ 
                 $scope.wordCount.insert(t);
                 $scope.words = $scope.wordCount.getWords();                 
                 $scope.searchResults = t;
              });
            })
        });

       $scope.realTimeTweets = function () {
          $scope.wordCount = wordCount.wordCount();
          tweets.realTimeTweets($scope.searchText,$scope.prevSize);
        }

      $scope.realTimeTweets();
});

app.controller('AnalysisCtrl', function($scope,$location,tweets,queryBuilder,$timeout,wordCount) {
  $scope.searchText = $location.path().substr(1);
  $scope.prevSize = '500';
  $scope.live = true;
  $scope.words = [];

  tweets.registerCallback(function (t) {   
          $timeout(function() {
              $scope.$apply(function() { 

              });
            })
        });

   $scope.$watch('searchCandidate', function(value){

           if(value != undefined) { 
             return tweets.getAnalyzedTweets($scope.searchText,$scope.prevSize);
            } 
    });

   $scope.historicTweets = function () {

          $scope.wordCount = wordCount.wordCount();
          tweets.getAnalyzedTweets($scope.searchText,$scope.prevSize);
        }

    $scope.historicTweets();        
});

app.controller('MapCtrl', function($scope) {
  $scope.map = {
    center: {
        latitude: 18.9,
        longitude: 72.8
    },
    zoom: 3
   };   
 }); 

 app.controller('NavigationCtrl', function($scope,$location) {
      $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
      };
 });   