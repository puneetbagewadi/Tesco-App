'use strict';

/**
 * @ngdoc function
 * @name tescoUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tescoUiApp
 */
angular.module('tescoUiApp')
  .controller('MainCtrl', ['$scope','DataService', function ($scope, DataService) {


        $scope.sortPreference = '';

        $scope.products = {};
        $scope.products.list = [];
        $scope.products.get = function() {
            var promise = DataService.fetch();
            promise.then(function(data) {
                $scope.products.list = data.Details;
            }, function(error) {
                console.log(error);
            });
        };

        /*
        *   Sorting
        */
        $scope.products.sort = function () {
            var sortPreference = $scope.sortPreference;

            function sortAsc(a,b) {
                if (a.Price > b.Price)
                    return 1;
            }
            function sortDesc(a,b) {
                if (a.Price < b.Price)
                    return 1;
            }

            if(sortPreference == 'asc'){
                $scope.products.list.sort(sortAsc);
            } else if (sortPreference == 'desc'){
                $scope.products.list.sort(sortDesc);
            }

            return 0;
        };

        $scope.basket = {};
        $scope.basket.list = [];
        $scope.basket.totalItems = 0;
        $scope.basket.addItem = function(product, quantity) {
            var existsInBasket = false;
            $scope.basket.list.forEach(function(entry) {
                if(entry.Id == product.Id) {
                    existsInBasket = true;
                    entry.quantity +=  quantity;
                }
            });
            if(!existsInBasket) {
                product.quantity = quantity;
                $scope.basket.list.push(product);
            }
            $scope.basket.totalItems += quantity;
        };

        $scope.basket.removeItem = function(product) {
            var idx = -1;
            $scope.basket.list.forEach(function(entry, index) {
               if(entry.Id == product.Id) {
                   idx = index;
                   return;
               }
            });
            if(idx>-1) {
                $scope.basket.totalItems = $scope.basket.totalItems - product.quantity;
                product.quantity = 0;
                $scope.basket.list.splice(idx, 1);
            }
        };

        $scope.incrQuantity = function(value, updateTotal) {
          if(value >= $scope.maxQuantity) {
              return value;
          }
          else {
              if(updateTotal) {
                  $scope.basket.totalItems++;
              }
              return value+1;
          }
        };

        $scope.decrQuantity = function(value, updateTotal) {
            if(value <= $scope.minQuantity) {
                return value;
            }
            else {
                if(updateTotal) {
                    $scope.basket.totalItems--;
                }
                return value-1;
            }
        };

        var init = function() {
            /* Constants */
            $scope.maxQuantity = 10;
            $scope.minQuantity = 0;

            $scope.products.get();
        };

        init();

  }]);
