(function(){
    'use strict';

    angular
        .module('app')
        .controller('WeatherController', WeatherController)

    WeatherController.$inject = ['weatherFactory', 'toastr'];

    function WeatherController(weatherFactory, toastr) {
        var vm = this;

        vm.searches = [];
        vm.cityName = '';

        vm.getWeather = getWeather;
        
        ///////////

        function getWeather(city) {
            weatherFactory
                .getWeatherForCity(city)
                .then(function(data) {
                    vm.forecast = data;
                    vm.searches.push({
                        timestamp: new Date(),
                        name: data.name
                    });
                    toastr.success('Downloaded weather for ' + city, 'Success');
                })
                .catch(function(err) {
                    toastr.error('Weather for ' + city + ' could not be found', 'Error');
                });
        }
    }
})();