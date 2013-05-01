(function (angular) {
    'use strict';
    
    var WINNING_SCORE = 101;
    
    var cribbage_score = angular.module('CribbageScore', ['storage']);
    
    var cribbage_controller_factory = function (player_id) {
        return function ($scope) {
            $scope.score = 0;
            if (!$scope.custom_increment) {
                $scope.custom_increment = 5;
            }
            
            $scope.default_player_name = 'Player ' + player_id;
            $scope.player_id = player_id;
            
            $scope.increment_score = function (increment) {
                $scope.score += increment;
            };
            
            $scope.edit_player_names = function () {
                $scope.$root.is_capturing_names = true;
            }
            
            $scope.$watch('score', function (score) {
                if (score > WINNING_SCORE) {
                    $scope.extra_css = 'won';
                } else {
                    $scope.extra_css = '';
                }
            });
        };
    };
    
    cribbage_score.controller(
        'Player1Controller',
        cribbage_controller_factory(1)
    );
    cribbage_score.controller(
        'Player2Controller',
        cribbage_controller_factory(2)
    );
    
    cribbage_score.controller('NamesController', function ($scope, localstorage) {
        $scope.finish_editing = function () {
            if ($scope.name_form.$invalid) {
                return;
            }
            
            $scope.$root.player_names = $scope.names;
            $scope.$root.is_capturing_names = false;
            localstorage.put('player_names', $scope.names);
        };
        
        var player_names = localstorage.get('player_names') || {};
        $scope.$root.player_names = player_names;
        $scope.names = player_names;
    });

})(window.angular);
