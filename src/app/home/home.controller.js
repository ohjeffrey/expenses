(function () {
    'use strict';

    angular
        .module('expenses')
        .controller('HomeCtrl', HomeCtrl);

    /** @ngInject */
    function HomeCtrl($state, Session) {

        var vm = this;
        vm.getProfile = getProfile;

        init();

        function init() {
            if (!Session.isLoggedIn()) {
                $state.go('login');
            }
        }

        function getProfile() {
            Session.getUser().then(function (data) {
                vm.user = data;
                console.log('tye', typeof data);
            }, function () {
                angular.noop();
            });
        }
    }
})();
