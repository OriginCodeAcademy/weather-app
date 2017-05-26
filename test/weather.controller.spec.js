var okLondonResponse = {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02d"}],"base":"stations","main":{"temp":58.44,"pressure":1004,"humidity":62,"temp_min":51.8,"temp_max":64.4},"visibility":10000,"wind":{"speed":14.99,"deg":90},"clouds":{"all":8},"dt":1494440400,"sys":{"type":1,"id":5091,"message":0.0116,"country":"GB","sunrise":1494389704,"sunset":1494445184},"id":2643743,"name":"London","cod":200};
var badResponse = {"cod": "404", "message": "city not found"};

describe('Weather App', function()  {
    var ctrl, factory, $rootScope, $q, $scope, deferred;

    beforeEach(module('app'));

    beforeEach(inject(function($controller, _$rootScope_, _$q_) {
        $rootScope = _$rootScope_;
        $q = _$q_;
        $scope = _$rootScope_.$new();

        factory = {
            getWeatherForCity: function(city) {
                deferred = $q.defer();

                return deferred.promise;
            }
        };

        toastr = {
            success: function(msg, title) {},
            error: function(msg, title) {}
        }

        spyOn(toastr, 'success');
        spyOn(toastr, 'error');

        ctrl = $controller('WeatherController', { 
            $scope: $scope,
            weatherFactory: factory, 
            toastr: toastr 
        });
    }));

    describe('Controller VM', function()  {
        it('should contain a `searches` array property', function()  {
            expect(ctrl.searches).toEqual([]);
        });
        it('should contain a cityName string property', function()  {
            expect(ctrl.cityName).toEqual('');
        });

        describe('getWeather function', function() {
            it('should exist', function()  {
                expect(ctrl.getWeather).toBeDefined();
            });
            it('should contain a cityName parameter', function() {
                expect(ctrl.getWeather.length).toEqual(1);
                expect(getParamNames(ctrl.getWeather)[0] === 'cityName');
            });
            it('should return a promise', function() {
                var actual = ctrl.getWeather('London');
                expect(Promise.resolve(actual) == actual); // http://stackoverflow.com/questions/27746304/how-do-i-tell-if-an-object-is-a-promise/38339199#38339199
            });

            describe('with a successful response', function() {
                beforeEach(function() {
                    ctrl.getWeather('London');
                    deferred.resolve(okLondonResponse);
                    $rootScope.$apply();
                });
                it('should store forecast in controller', function() { 
                    expect(ctrl.forecast).toBeDefined();
                    expect(ctrl.forecast).toEqual(okLondonResponse);
                });
                it('should add a result to the search history', function() {
                    expect(ctrl.searches.length).toBe(1);
                    expect(ctrl.searches[0].name).toEqual('London');
                    expect(ctrl.searches[0].timestamp instanceof Date).toEqual(true);
                });
                it('should show a success message using toastr', function() {
                    expect(toastr.success).toHaveBeenCalledWith('Downloaded weather for London', 'Success'); 
                });
            });

            describe('with a failing response', function() {
                it('should show an error message using toastr', function() {
                    ctrl.getWeather('FakeCityThatDoesNotExistAtAll');
                    deferred.reject();
                    $rootScope.$apply();
                    expect(toastr.error).toHaveBeenCalledWith('Weather for FakeCityThatDoesNotExistAtAll could not be found', 'Error');
                });
            });
        });
    });
});

///////////////

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}

var expectPromisedValue = function(promise, expectedValue) {
  promise.then(function(resolvedValue) {
    expect(resolvedValue).toEqual(expectedValue);
  });
}
