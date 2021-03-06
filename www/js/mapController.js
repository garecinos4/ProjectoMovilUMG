/**
 * Maneja las funciones del mapa
 * @author Gabriela Alejandra Recinos Arevalo
 */

(function () {
    'use strict';
    angular.module('app.mapController', [])
        .controller('MapController', MapController);

    MapController.$inject = ['Service'];

    function MapController(Service) {
        var self = this;

        self.building = {};

        var markers = [];

        var mapCanvas = document.getElementById('map-canvas');

        var center = new google.maps.LatLng(14.659275, -90.513378);

        var mapOptions = {
            title: 'default',
            zoom: 18,
            center: {
                lat: 14.659275,
                lng: -90.513378
            },
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };

        var map = new google.maps.Map(mapCanvas, mapOptions);

        var listener;
        /**
         * Invoca a la función que 
         * inicia los componentes del mapa
         */

        initMap();

        /**
         * Funcion que inicializa los componentes del mapa
         */
        function initMap() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = new google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude
                    //   14.659275,
                    //  -90.513378
                        );

                    var distance = google.maps.geometry.spherical.computeDistanceBetween(pos, center);

                    if (distance > 3000) {
                        alert("Te encuentras fuera del rango");
                    } else {
                        //listener = google.maps.event.addListener(map, 'click', function (e) {
                        addMark(pos, "Usted esta aquí");
                        
                        //});  
                    }
                    getBuildings();

                }, function () {
                    handleNoGeolocation(true);
                });
            } else {
                // Browser doesn't support Geolocation
                handleNoGeolocation(false);
            }
        }
       
        /** 
         * Función que pinta la marca y 
         * la ventana de información en el mapa
         * @param {google.maps.LatLng} position
         * @param {google.maps.Map} map
         */
        function addMark(position, content) {
            //Instancia una marca
            var marker = new google.maps.Marker({
                position: position,
                map: map,
                animation: google.maps.Animation.DROP
            });

            markers.push(marker);
            
            //Instancia una ventana de información
            var infowindow = new google.maps.InfoWindow();
            infowindow.setContent('<b>' + content + '</b>');
            infowindow.open(map, marker);

            google.maps.event.trigger(map, "resize");
            map.panTo(position);

        }


        function addMarker(place) {
            var BuildPosition = new google.maps.LatLng(
                place.latitude,
                place.longitude
                );

            var marker = new google.maps.Marker({
                position: BuildPosition,
                map: map
            });
            markers.push(marker);


            var infoWindow = new google.maps.InfoWindow();
            infoWindow.setContent('<b>' + place.name + '</b>');
            infoWindow.open(map, marker);

            google.maps.event.addListener(marker, 'click', function () {

                var infoWindow = new google.maps.InfoWindow();
                infoWindow.setContent('<b>' + place.name + '</b>');
                infoWindow.open(map, marker);
            });
        }

        function getBuildings() {
            return Service.getInfo('buildings')
                .then(function (result) {
                    if (result && result.code === 0) {
                        //self.buildings = result.data;
                        for (var i = 0; i < result.data.length; i++) {
                            //console.log(result.data[i]);
                            addMarker(result.data[i]);
                        }
                    } else {
                        //swal(result.message);
                    }
                });
        }

        function setMapOnAll(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }


        self.doRefresh = function () {
            setMapOnAll(null);
            markers = [];
            initMap();
        }

        function handleNoGeolocation(errorFlag) {
            if (errorFlag) {
                var content = 'Error: The Geolocation service failed.';
            } else {
                var content = 'Error: Your browser doesn\'t support geolocation.';
            }

            var options = {
                map: map,
                position: new google.maps.LatLng(60, 105),
                content: content
            };

            var infowindow = new google.maps.InfoWindow(options);
            map.setCenter(options.position);
        }


    }
})();
