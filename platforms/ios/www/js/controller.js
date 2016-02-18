(function () {
    'use strict';
    angular.module('app.controller', ['ionic', 'ngCordova'])
        .controller('Controller', Controller)
        .factory('infoSearch', function () {
            var info;
            return {
                getInfo: function () {
                    return info; 
                },
                setInfo: function (data) {
                    var info = [];
                    info = data
                    return info;
                }
            }


        });

    Controller.$inject = ['$location', '$cordovaBarcodeScanner', 'Service', '$ionicPopup', 'infoSearch'];

    function Controller($location, $cordovaBarcodeScanner, Service, $ionicPopup, infoSearch) {
        var self = this;

        self.info = [];

        
            console.log(infoSearch.getInfo());
    

        self.scanQR = function () {
            console.log("ESCANEANDO....");
            $cordovaBarcodeScanner
                .scan()
                .then(function (image) {
                    // Success! Barcode data is here
                    alert("ESCANEANDO...." + image.text);
                }, function (error) {
                    // An error occurred
                    console.log("Ha ocurrido un error : " + error);
                });
        }

        self.goToSearch = function () {
            window.location.href = "basicInfo.html";
        }

        self.searchInfo = function () {
            console.log(self.text + " - " + self.checkboxOption);
            return Service.findBasicInfo(self.checkboxOption, self.text)
                .then(function (result) {
                    if (result && result.code === 0 && result.data.length > 0) {
                        infoSearch.setInfo(result.data);
                        window.location.href = "searchResponse.html";
                    } else if (result.data.length < 1) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'No se encontro resultado',
                            template: 'Intenta con otro texto.',
                            okText: 'Aceptar',
                        });
                        alertPopup.then(function (res) {
                            console.log('Do something');
                        });
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error',
                            template: 'Error: ' + result.message,
                            okText: 'Aceptar',
                            okType: 'button-assertive',
                        });
                        alertPopup.then(function (res) {
                            console.log('Do something');
                        });
                    }
                });

        }

        self.isCheck = function (value) {
            self.checkboxOption = value;
        }


    }

})();