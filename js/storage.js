(function (angular) {
    'use strict';
    
    var storage = angular.module('storage', ['ng']);
    storage.factory('localstorage', ['$log', function ($log) {
        var is_local_storage_available;

        var test_variable = 'test';
        try {
            localStorage.setItem(test_variable, test_variable);
            localStorage.removeItem(test_variable);
            is_local_storage_available = true;
            $log.info('localstorage is availabile');
        } catch (e) {
            is_local_storage_available = false;
            $log.info('localstorage is unavailabile!');
        }
        
        var service = {
            get: function (key) {
                if (!is_local_storage_available) {
                    return;
                }
                
                var encoded_value = localStorage.getItem(key);
                return angular.fromJson(encoded_value);
            },
            put: function (key, value) {
                if (!is_local_storage_available) {
                    return;
                }
                
                var encoded_value = angular.toJson(value);
                localStorage.setItem(key, encoded_value);
            },
            remove: function (key) {
                if (!is_local_storage_available) {
                    return;
                }
                
                localStorage.removeItem(key);
            }
        };
        
        if (!is_local_storage_available) {
            service = {
                get: angular.noop,
                put: angular.noop,
                remove: angular.noop
            };
        }
        
        return service;
    }]);
    
})(window.angular);