'use strict';

angular.module('pivot.services').factory('tweets', function ($http,queryBuilder,$location) {

  var onNewTweets = function (t) {};
  var registerCallback = function (callback) { onNewTweets = callback; };

  var search = function(queryString, prevSize) {
    var searchString = "*";
    if(queryString.length > 0) {
      searchString=queryString;
    }

    $http({method: "POST", data: queryBuilder.getOldTweets(searchString, prevSize, 0), url: "/tweets/search"})
                .success(function (data) {
                   onNewTweets(data.hits.hits.map(function (t) { return t._source.text; } ));
                }).error(function (data, status, headers, config) { });
  }	

  return {search: search, registerCallback: registerCallback};
});	