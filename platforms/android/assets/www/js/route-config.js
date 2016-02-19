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
            .state('tab.home', {
                url: '/home',
                views: {
                    'tab-home': {
                        templateUrl: 'views/tab-home.html',
                        controller: 'Controller',
                        controllerAs: 'vm'
                    }
                }
            })
            
            .state('tab.map', {
                url: '/map',
                views: {
                    'tab-map': {
                        templateUrl: 'views/tab-map.html',
                        controller: 'MapController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('tab.scanner', {
                url: '/scanner',
                views: {
                    'tab-scanner': {
                        templateUrl: 'views/tab-scanner.html',
                        controller: 'Controller',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('tab.result', {
                url: '/result/:text',
                views: {
                    'tab-scanner': {
                        templateUrl: 'views/search-response.html',
                        controller: 'SearchController',
                        controllerAs: 'vm'
                    }
                }
            })


            .state('tab.search', {
                url: '/search',
                views: {
                    'tab-search': {
                        templateUrl: 'views/tab-search.html',
                        controller: 'SearchController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('tab.building', {
                url: '/building',
                views: {
                    'tab-search': {
                        templateUrl: 'views/tab-building.html',
                        controller: 'SearchController',
                        controllerAs: 'vm'
                    }
                }
            })
             .state('tab.step', {
                url: '/step',
                views: {
                    'tab-search': {
                        templateUrl: 'views/tab-step.html',
                        controller: 'SearchController',
                        controllerAs: 'vm'
                    }
                }
            })
             .state('tab.course', {
                url: '/course',
                views: {
                    'tab-search': {
                        templateUrl: 'views/tab-course.html',
                        controller: 'SearchController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('tab.response', {
                url: '/response',
                views: {
                    'tab-search': {
                        templateUrl: 'views/search-response.html',
                        controller: 'SearchController',
                        controllerAs: 'vm'
                    }
                }
            })


        $urlRouterProvider.otherwise('/tab/home');

    }






})();