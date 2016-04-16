/* Sample Controller */
var movieControllers = angular.module('movieControllers', []);

movieControllers.controller('homeCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });

        $scope.orderProp = 'name';
    }]);


movieControllers.controller('searchCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });

        $scope.orderProp = 'name';
    }]);

movieControllers.controller('loginCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });

        $scope.orderProp = 'name';
    }]);
movieControllers.controller('newuserCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });

        $scope.orderProp = 'name';
    }]);
movieControllers.controller('addRestaurantCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });

        $scope.orderProp = 'name';
    }]);
movieControllers.controller('viewRestaurantsCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });

        $scope.orderProp = 'name';
    }]);


movieControllers.controller('restaurantCtrl',  ['$scope', '$http',
    function ($scope, $http) {
        $scope.name = "";
        $scope.location = "";
        $scope.foodstyle = "";
        $scope.qualityrating = 0;
        $scope.pricerating = 0;
        $scope.submitted = "Not submitted yet!";
        //console.log("BEFORE POST");
        //console.log("!!!!!!");
        $scope.sendPost = function() {
            var data = $.param({
                name: $scope.name,
                location: $scope.location,
                foodstyle: $scope.foodstyle,
                qualityrating: $scope.qualityrating,
                pricerating: $scope.pricerating
            });

            //console.log("!!!!!!");
            console.log(data);
            $.post("/api/v1/restaurants", data).success(function(data, status) {
                $scope.submitted = "Added restaurant!";
            });
            //console.log("AFTER POST");
        }
    }]);
movieControllers.controller('reviewCtrl',  ['$scope', '$http',
    function ($scope, $http) {
        $scope.username = "";
        $scope.location = "";
        $scope.restaurantname = "";
        $scope.qualityrating = 0;
        $scope.pricerating = 0;
        $scope.comment = "";
        $scope.submitted = "Not submitted yet!";
        console.log("BEFORE POST");
        console.log("!!!!!!");
        $scope.sendPost = function() {
            var data = $.param({
                username: $scope.username,
                location: $scope.location,
                comment: $scope.comment,
                qualityrating: $scope.qualityrating,
                pricerating: $scope.pricerating,
                restaurantname: $scope.restaurantname
            });

            console.log("!!!!!!");
            console.log(data);
            $.post("/api/v1/reviews", data).success(function(data, status) {
                $scope.submitted = "Added review!";
            });
            console.log("AFTER POST");
        }
    }]);

movieControllers.controller('deleteRestaurantsCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.name = "";
        $scope.location = "";
        $scope.submitted = "Not submitted yet!";
                $scope.sendPost = function() {
            var data = $.param({
                 name: $scope.name,
                 location: $scope.location
               
            });
            console.log("!!!!!!");
            console.log(data);
        var urlName = "/api/v1/restaurants/" + $scope.location;
        console.log(urlName);
$http.delete(urlName).success(function(data, status){
        $scope.submitted = "Deleted restaurant!";
});
        console.log("DONE");
        }
        


        
    }]);

