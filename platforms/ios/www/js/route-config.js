(function () {
    'use strict';

    angular
        .module('app.routeConfig', [])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];


    function config($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'views/tabs.html'
            })
            .state('tab.app', {
                url: '/app',
                views: {
                    'tab-app': {
                        templateUrl: 'views/app.html',
                        controller: 'Controller'
                    }
                }
            })
            .state('tab.map', {
                url: '/map',
                views: {
                    'tab-map': {
                        templateUrl: 'views/tab-map.html',
                        controller: 'MapController'
                    }
                }
            })
            .state('tab.scanner', {
                url: '/scanner',
                views: {
                    'tab-scanner': {
                        templateUrl: 'views/tab-scanner.html',
                        controller: 'Controller'
                    }
                }
            })

            .state('tab.search', {
                url: '/search',
                views: {
                    'tab-search': {
                        templateUrl: 'views/tab-search.html',
                        controller: 'Controller'
                    }
                }
            })


        $urlRouterProvider.otherwise('/tab/app');

    }






})();