'use strict';

angular.module('pivot.services').factory('queryBuilder',function() {
    
     var getOldTweets = function(queryString,size,from) {
          return {
            size: size,
            from: from,
            query: {
                query_string: {
                    default_field: "text",
                    query: "(" + queryString + ") AND lang:en",
                    default_operator: "AND"
                }
            },
            sort: { "created_at": "desc" } 
        };
     } 

     return {getOldTweets: getOldTweets};
});