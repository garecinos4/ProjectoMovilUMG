(function () {
    'use strict';
    angular.module('app.controller', [])
        .controller('Controller', Controller);

    Controller.$inject = ['$state', '$ionicPopup'];

    function Controller($state, $ionicPopup) {
        var self = this;

        self.scanQR = function () {
            cloudSky.zBar.scan({}, function (response) {
                if (response) {
                    var url = response;

                    try {
                        var id = url.split('#')[1];
                        var text = id.replace('%20', ' ');
                        $state.go('tab.result', { text: text });
                    } catch (e) {
                        alert("Codigo no valido");
                    }
                }
            }, function (error) {
                console.log("Ha ocurrido un error : " + error);
            });
        }
    }
})();