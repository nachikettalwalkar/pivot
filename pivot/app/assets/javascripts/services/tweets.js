'use strict';

angular.module('pivot.services').factory('tweets', function ($http,queryBuilder,$location) {

  var tweetFeed;
  var tweetsCache = [];

  var onNewTweets = function (t) {};
  var registerCallback = function (callback) { onNewTweets = callback; };

 /* var search = function(queryString, prevSize) {
    console.log("on text enter");
    var searchString = "*";
    if(queryString.length > 0) {
      searchString=queryString;
    }

    $http.get('/tweets/search',{params: {searchString:searchString}})
                .success(function (data) {
                    console.log(data);
                   onNewTweets(data.hits.hits.map(function (t) { return t._source.text; } ));
                }).error(function (data, status, headers, config) { });
  }*/	

  var realTimeTweets = function (queryString, prevSize) {
      if (typeof tweetFeed === 'object') { tweetFeed.close(); }
            
      var searchString = "*";
        if(queryString.length > 0) {
            searchString=queryString;
            $location.path(searchString);
        }else {
          $location.path("");
        }

        var cachedCallback = function(msg) {
            var jsonData = JSON.parse(msg.data);

            tweetsCache = tweetsCache.concat(jsonData.text);
            var lastFiveTweets = tweetsCache.slice(Math.max(tweetsCache.length - 6, 1))
            onNewTweets(lastFiveTweets); 
            
        };

        tweetFeed = new EventSource("/tweetFeed?q=" + searchString);
        tweetFeed.addEventListener("message", cachedCallback, false);
            
        $http({method: "POST", data: queryBuilder.getOldTweets(searchString, prevSize, 0), url: "/tweets/search"})
            .success(function (data) {
                onNewTweets(data.hits.hits.map(function (t) { return t._source.text; } ));
            }).error(function (data, status, headers, config) { });

    }; 

    var getAnalyzedTweets = function (queryString, prevSize) {
      var searchString = "*";
        if(queryString.length > 0) {
            searchString=queryString;
            $location.path(searchString);
        }else {
          $location.path("");
        }

            
        $http.get('/tweets/analysis',{params: {searchString:searchString}})
                .success(function (data) {
                    console.log(data);
                  // onNewTweets(data.hits.hits.map(function (t) { return t._source.text; } ));
                }).error(function (data, status, headers, config) { });

    }; 

  return {realTimeTweets: realTimeTweets, getAnalyzedTweets:getAnalyzedTweets, registerCallback: registerCallback};
});	