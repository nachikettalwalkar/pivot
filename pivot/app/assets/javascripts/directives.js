'use strict';

angular.module('pivot.directives', ['charts.wordCloud'])

.directive('cloud', function (wordcloud) {
        console.log("here");
        return {
            restrict: 'C',
            scope: { words: "=words", live: "=live", interval: "=interval", callback: "=callback" },
            link: function ($scope, elem, attrs) {
                function init() {
                    elem.empty();
                    $scope.wordCloud = wordcloud.WordCloud(elem.width(), elem.width() * 0.75, 250, $scope.callback, elem);
                }
                init();

                var lastCloudUpdate = new Date().getTime() - $scope.interval;
                $scope.$watch("words", function() {
                    if ((new Date().getTime() - lastCloudUpdate) > $scope.interval &&  $scope.live) {
                        $scope.wordCloud.redraw($scope.words);
                    }
                });

                /** re-initialize wordCloud on window resize */
                $(window).resize(function () { _.throttle(init, 1000)(); });
            }
        }
    });

