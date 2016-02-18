(function () {
    'use strict';
    angular.module('app.searchController')
        .factory('InfoFactory', InfoFactory);
        
        function InfoFactory(){
            var info = [];
            return {
                get: get,
                set: set,
                clear: clear
            }
            
            function get (){
                return info;
            }
            
            function set(data){
                info = data;
            }
            
            function clear(){
                info = [];
            }
            
        }
	        
   
})();