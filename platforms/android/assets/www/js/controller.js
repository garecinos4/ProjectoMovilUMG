(function () {
    'use strict';
    angular.module('app.controller', ['ionic', 'ngCordova'])
        .controller('Controller', Controller);

    Controller.$inject = ['$scope', '$state', '$cordovaBarcodeScanner', '$ionicPopup'];

    function Controller($scope, $state, $cordovaBarcodeScanner, $ionicPopup) {
        //var self = this;

        $scope.scanQR = function () {
            $cordovaBarcodeScanner
                .scan()
                .then(function (image) {
                    /* //Success! Barcode data is here*/
                    alert("ESCANEANDO...." + JSON.stringify(image));
                    var url = image.text;
                    try {
                        var id = url.split('#')[1];
                        var text = id.replace('%20', ' ');
                        $state.go('tab.result', { text:  text});
                    } catch (e) {
                        alert("Codigo no valido");
                    }
                }, function (error) {
                    // An error occurred
                    console.log("Ha ocurrido un error : " + error);
                });
        }
    }
})();