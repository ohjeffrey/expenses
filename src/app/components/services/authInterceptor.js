(function () {
    'use strict';

    angular.module('expenses')
        .factory('AuthInterceptor', authInterceptor);

    /** @ngInject */
    function authInterceptor($q, $injector) {

        return {
            request: request,
            responseError: responseError
        };

        function request(config) {
            var session = $injector.get('Session');
            config.headers['x-access-token'] = session.getToken();

            return config;
        }

        function responseError(rejection) {
            if (rejection.status === 401 && rejection.config.url !== "/v1/authorize") {
                var $state = $injector.get('$state');
                $state.go('login');
            }
            return $q.reject(rejection);
        }
    }

})();