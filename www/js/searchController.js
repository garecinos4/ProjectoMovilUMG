(function () {
    'use strict';
    angular.module('app.searchController', [])
        .controller('SearchController', SearchController)


    SearchController.$inject = ['$state', 'Service', '$ionicPopup', 'InfoFactory', '$stateParams'];

    function SearchController($state, Service, $ionicPopup, InfoFactory, $stateParams) {
        var self = this;
        self.checkboxOption = "";
        self.info = [];
        self.info = InfoFactory.get();

        if ($stateParams.text) {
            console.log("text " + $stateParams.text);
            self.checkboxOption = ($stateParams.text).split('/')[1];
            self.text = (($stateParams.text).split('/')[2]).replace('%20', '');
            InfoFactory.clear();
            search().then(function (resp) {
                self.info = InfoFactory.get();
            });
        }


        self.isCheck = function (value) {
            console.log(value);
            self.checkboxOption = value;
        }

        self.searchInfo = function () {
            InfoFactory.clear();
            search().then(function (resp) {
                $state.go('tab.response');
            });

        }


        function search() {
            console.log(self.text + " - " + self.checkboxOption);

            if (self.text) {
                return Service.findBasicInfo(self.checkboxOption, self.text)
                    .then(function (result) {
                        if (result && result.code === 0 && result.data.length > 0) {
                            InfoFactory.set(result.data);
                        } else if (result.data.length < 1) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'No se encontro resultado',
                                template: 'Intenta con otro texto.',
                                okText: 'Aceptar',
                            });
                            alertPopup.then(function (res) {
                                //console.log('Do something');
                            });
                        } else {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error',
                                template: 'Error: ' + result.message,
                                okText: 'Aceptar',
                                okType: 'button-assertive',
                            });
                            alertPopup.then(function (res) {
                                //console.log('Do something');
                            });
                        }
                    });
            }


        }
    }
})();