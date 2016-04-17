/* Sample Controller */
var restaurantController = angular.module('restaurantController', []);

restaurantController.controller('homeCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });

        $scope.orderProp = 'name';
    }]);


restaurantController.controller('searchCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });

        $scope.orderProp = 'name';
    }]);

restaurantController.controller('loginCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });

        $scope.orderProp = 'name';
    }]);
restaurantController.controller('newuserCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {

        $scope.orderProp = 'name';

        $scope.createUser = function(){
            var data = {fullname: $scope.fullname, username: $scope.username, hashedpassowrd: $scope.password, zipcode: $scope.zipcode, 'favoritefoodstyles[]': ["mexican"]};
            $http.post('/api/v1/customers', JSON.stringify(data)).success(function(){
                $scope.submitted = "Successfully created user!";
                $scope.fullname = "";
                $scope.username = "";
                $scope.zipcode = "";
                $scope.password = "";

            });

        };
    }]);


restaurantController.controller('addRestaurantCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });
        $scope.name = "";
        $scope.location = "";
        $scope.foodstyle = "";
        $scope.qualityrating = 0;
        $scope.pricerating = 0;


        $scope.orderProp = 'name';
        $scope.submitted = "";

        $scope.addRestaurant = function() {

            var data = {
                name: $scope.name,
                location: $scope.location,
                qualityrating: 0,
                pricerating: 0,
                foodstyle: $scope.foodstyle,
            };
            console.log(JSON.stringify(data));
            $http.post("/api/v1/restaurants", JSON.stringify(data)).success(function(data, status) {
                $scope.submitted = "Added restaurant!";
                $scope.name = "";
                $scope.location = "";
            });
        };
    }]);
restaurantController.controller('viewRestaurantsCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });

        $scope.orderProp = 'name';
    }]);


restaurantController.controller('restaurantCtrl',  ['$scope', '$http',
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
            var data = {
                name: $scope.name,
                location: $scope.location,
                foodstyle: $scope.foodstyle,
                qualityrating: $scope.qualityrating,
                pricerating: $scope.pricerating
            };

            //console.log("!!!!!!");
            //console.log(data);
            $http.post("/api/v1/restaurants", JSON.stringify(data)).success(function(data, status) {
                $scope.submitted = "Added restaurant!";
            });
            //console.log("AFTER POST");
        };
    }]);

restaurantController.controller('reviewCtrl',  ['$scope', '$http',
    function ($scope, $http) {
        $scope.username = "";
        $scope.location = "";
        $scope.name = "";
        $scope.qualityrating = 0;
        $scope.pricerating = 0;
        $scope.comment = "";
        $scope.submitted = "";
        $scope.addReview = function() {
            var data = {
                username: $scope.username,
                location: $scope.location,
                comment: $scope.comment,
                qualityrating: parseInt($scope.qualityrating),
                pricerating: parseInt($scope.pricerating),
                restaurantname: $scope.restaurantname
            };
            $.post("/api/v1/reviews", data).success(function(data, status) {
                $scope.submitted = "Added review!";
            }).error(function (data, status, headers, config) {
                console.log(data);
                console.log(status);
                console.log(headers);
            });
        }
    }]);

restaurantController.controller('deleteRestaurantsCtrl', ['$scope', '$http',
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

restaurantController.controller('restaurantDetailsCtrl', ['$scope', '$routeParams', '$filter','$http', '$rootScope',
    function($scope, $routeParams, $filter, $http, $rootScope) {
        $http.get('/api/v1/restaurants/' + $routeParams.location).success(function(data) {
            $scope.restaurant = data;
            //$scope.task = $filter('filter')(data, {_id: $scope.id})[0];
        });

        $http.get('api/v1/reviews').success(function(data){
            $scope.reviews = data;
        })
        $scope.orderProp = 'name';
    }]);

restaurantController.controller('viewRestaurantsCtrl', ['$scope', '$routeParams', '$filter','$http', '$rootScope',
    function($scope, $routeParams, $filter, $http, $rootScope) {
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });

        $scope.orderProp = 'name';
        $scope.deleteRestaurant = function(location){
            var urlName = "/api/v1/restaurants/" + location;
            $http.delete(urlName).success(function(data, status){
            });
            $http.get('/api/v1/restaurants').success(function(data) {
                $scope.restaurants = data;
            });
        };
    }]);

restaurantController.controller('userDetailsCtrl', ['$scope', '$routeParams', '$filter','$http', '$rootScope',
    function($scope, $routeParams, $filter, $http, $rootScope) {
        $http.get('/api/v1/customers/' + $routeParams.username).success(function(data) {
            $scope.user = data;
        });

        $scope.orderProp = 'name';
    }]);

restaurantController.controller('viewUsersCtrl', ['$scope', '$routeParams', '$filter','$http', '$rootScope',
    function($scope, $routeParams, $filter, $http, $rootScope) {
        $http.get('/api/v1/customers').success(function(data) {
            $scope.users = data;
        });

        $scope.orderProp = 'username';
    }]);

restaurantController.controller('recsCtrl', ['$scope', '$routeParams', '$filter','$http', '$rootScope',
    function($scope, $routeParams, $filter, $http, $rootScope) {
        $http.get('/api/v1/customers').success(function(data) {
            $scope.users = data;
        });

        $scope.orderProp = 'username';
        $scope.getRec = function(){

        };
    }]);

restaurantController.controller('reviewDetailsCtrl', ['$scope', '$routeParams', '$filter','$http', '$rootScope',
    function($scope, $routeParams, $filter, $http, $rootScope) {
        $http.get('/api/v1/customers').success(function(data) {
            $scope.users = data;
        });

        $scope.orderProp = 'username';
        $scope.getRec = function(){

        };
    }]);
