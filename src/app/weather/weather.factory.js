(function(){
    'use strict';

    angular
        .module('app')
        .factory('weatherFactory', weatherFactory)

    weatherFactory.$inject = ['$http', '$q', 'apiKey'];

    function weatherFactory($http, $q, apiKey) {
        var service = {
            getWeatherForCity: getWeatherForCity
        };

        return service;

        function getWeatherForCity(cityName) {
            var defer = $q.defer();

            $http
                .get('http://api.openweathermap.org/data/2.5/weather?apikey=' + apiKey + '&units=imperial&q=' + cityName)
                .then(function(response) {
                    if(typeof response.data === 'Object' && response.data.cod === 200) {
                        defer.resolve(response.data);
                    } else {
                        defer.reject('Error downloading weather');
                    }
                })
                .catch(function(error) {
                  defer.reject('Error downloading weather');  
                });

            return defer.promise;
        }
    }
})();