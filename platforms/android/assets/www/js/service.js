(function () {
    angular.module('app.service', [])
        .factory('Service', Service);

    Service.$inject = ['$http'];
    var server = 'http://104.236.120.91/api/'
    //var server = 'http://localhost:8080/api/'
    function Service($http) {
        return {
            findBasicInfo: findBasicInfo,
            getInfo: getInfo
        };

        function findBasicInfo(service, text) {
            return $http.get(server + service + '/search/', { params: { text: text } })
                .then(getResponseOK)
                .catch(getResponseFailed);
            function getResponseOK(response) {
                return response.data;
            }
            function getResponseFailed(error) {
                console.log('XHR Failed for search ' + service + ' - Error: ' + error.data);
            }
        }

        function getInfo(service) {
            return $http.get(server + service + '/')
                .then(getResponseOK)
                .catch(getResponseFailed);

            function getResponseOK(response) {
                return response.data;
            }

            function getResponseFailed(error) {
                console.log('XHR Failed for get buildings.' + error.data);
            }
        }

    }


})();