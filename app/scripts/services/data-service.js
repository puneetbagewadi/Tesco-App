/**
 * Created by Puneet on 18/06/16.
 */


(function() {
    'use strict';
    var app = angular.module('tescoUiApp');


    app.service('DataService', ['$http', '$q', function($http, $q) {

            var DataService;

            return DataService =
            {

                    fetch: function (collection, data) {
                        var defer, options;
                        defer = $q.defer();

                        $http.get('assets/data.json').success(function (data) {
                            return defer.resolve(data);
                        }).error(function (err) {
                            return defer.reject(err);
                        });
                        return defer.promise;
                    }

            };

        }
    ]);

})();
