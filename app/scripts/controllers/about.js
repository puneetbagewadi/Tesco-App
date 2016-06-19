'use strict';

/**
 * @ngdoc function
 * @name tescoUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tescoUiApp
 */
angular.module('tescoUiApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
