'use strict';

angular.module('pivot.services').factory('queryBuilder',function() {

     var getAnalyzedTweets = function(queryString,size,from) {
          return {
            size: size,
            query: {
                query_string: {
                    default_field: "text",
                    query: "(" + queryString + ") AND lang:en",
                    default_operator: "AND"
                }
            },
            filter: {range:{created_at:{"from":"Wed May 14 09:35:03 +0000 2014","to": "Wed May 15 09:35:03 +0000 2014"}}},
            sort: { "created_at": "desc" } 
        };
     } 

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

/*{
    "filter" : {
        "range" : {
            "PublishTime" : {
                "from" : "20130505T000000",
                "to" : "20131105T235959"
            }
        }
    }
}*/

     return {getOldTweets: getOldTweets};
});