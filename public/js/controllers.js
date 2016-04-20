/* Sample Controller */
var restaurantController = angular.module('restaurantController', []);

restaurantController.controller('homeCtrl', ['$scope', '$http', '$rootScope', '$window',
    function($scope, $http, $rootScope, $window) {
        $scope.user = $window.sessionStorage.user;
        $rootScope.user = $window.sessionStorage.user;
        $rootScope.logout = function(){
            $window.sessionStorage.user = '';
            $scope.user = $window.sessionStorage.user;
            $rootScope.user = $window.sessionStorage.user;
            //console.log('logout');
        };
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });

        $scope.orderProp = 'name';
    }]);


restaurantController.controller('searchCtrl', ['$scope', '$http', '$rootScope','$window',
    function($scope, $http, $rootScope, $window) {
        $scope.user = $window.sessionStorage.user;
        $rootScope.user = $window.sessionStorage.user;
        $rootScope.logout = function(){
            $window.sessionStorage.user = '';
            $scope.user = $window.sessionStorage.user;
            $rootScope.user = $window.sessionStorage.user;
            //console.log('logout');
        };
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });

        $scope.orderProp = 'name';
    }]);

restaurantController.controller('loginCtrl', ['$scope', '$http', '$rootScope', '$window',
    function($scope, $http, $rootScope, $window) {
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });
        $window.sessionStorage.user = '';
        $scope.user = $window.sessionStorage.user;
        $rootScope.user = $window.sessionStorage.user;
        $rootScope.logout = function(){
            $window.sessionStorage.user = '';
            $scope.user = $window.sessionStorage.user;
            $rootScope.user = $window.sessionStorage.user;
            //console.log('logout');
        };
        $scope.submitted = '';

        $scope.logIn = function(){
            $http.get('/api/v1/customers/' + $scope.username + '/' + $scope.password).success(function(data){
                //console.log(data.message);
                if(data.message === 'accepted')
                {
                    $window.sessionStorage.user = $scope.username;
                    $scope.user = $window.sessionStorage.user;
                    $rootScope.user = $window.sessionStorage.user;
                    $scope.submitted = "Successfully logged in!";
                }
                else //data == 'rejected'
                {
                    $window.sessionStorage.user = "";
                    $scope.user = $window.sessionStorage.user;
                    $rootScope.user = $window.sessionStorage.user;
                    $scope.submitted = "Invalid username or password. Please try again.";
                }


            });
        };

        $scope.orderProp = 'name';
    }]);
restaurantController.controller('newuserCtrl', ['$scope', '$http', '$rootScope', '$window',
    function($scope, $http, $rootScope, $window) {
        //$scope.favoritefoodstyles = {};
        $scope.user = $window.sessionStorage.user;
        $rootScope.user = $window.sessionStorage.user;
        $rootScope.logout = function(){
            $window.sessionStorage.user = '';
            $scope.user = $window.sessionStorage.user;
            $rootScope.user = $window.sessionStorage.user;
            //console.log('logout');
        };
        $scope.orderProp = 'name';
        $scope.createUser = function(){
            $scope.selectedValues = [];
            angular.forEach($scope.favoritefoodstyles, function(val, key){
                if(val == true)
                    $scope.selectedValues.push(key.toString() );
            });
            var data = {fullname: $scope.fullname, username: $scope.username, password: $scope.password, zipcode: $scope.zipcode, 'favoritefoodstyles[]': $scope.selectedValues};
            $http.post('/api/v1/customers', JSON.stringify(data)).success(function(){
                $scope.submitted = "Successfully created user!";
                $scope.fullname = "";
                $scope.username = "";
                $scope.zipcode = "";
                $scope.password = "";

            });

        };
    }]);


restaurantController.controller('addRestaurantCtrl', ['$scope', '$http', '$rootScope', '$window',
    function($scope, $http, $rootScope, $window) {
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });
        $scope.user = $window.sessionStorage.user;
        $rootScope.user = $window.sessionStorage.user;
        $rootScope.logout = function(){
            $window.sessionStorage.user = '';
            $scope.user = $window.sessionStorage.user;
            $rootScope.user = $window.sessionStorage.user;
            //console.log('logout');
        };

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
restaurantController.controller('viewRestaurantsCtrl', ['$scope', '$http', '$rootScope', '$window',
    function($scope, $http, $rootScope, $window) {
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });
        $scope.user = $window.sessionStorage.user;
        $rootScope.user = $window.sessionStorage.user;
        $rootScope.logout = function(){
            $window.sessionStorage.user = '';
            $scope.user = $window.sessionStorage.user;
            $rootScope.user = $window.sessionStorage.user;
            //console.log('logout');
        };

        $scope.orderProp = 'name';
        /*
        $scope.deleteRestaurant = function(){
            console.log("delete");
        }; */
        $scope.deleteRestaurant = function(restaurant) {
            var data = $.param({
                name: restaurant.name,
                location: restaurant.location
            });
            var urlName = "/api/v1/restaurants/" + restaurant.location;
            $http.delete(urlName).success(function (data, status) {
                $http.get('/api/v1/restaurants').success(function (data) {
                    $scope.restaurants = data;
                });
            });
        };
    }]);

/*
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

            $http.post("/api/v1/restaurants", JSON.stringify(data)).success(function(data, status) {
                $scope.submitted = "Added restaurant!";
            });
            //console.log("AFTER POST");
        };
    }]);
    */

restaurantController.controller('reviewCtrl',  ['$scope', '$http','$rootScope', '$window',
    function ($scope, $http, $rootScope, $window) {
        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
        });
        $scope.user = $window.sessionStorage.user;
        $rootScope.user = $window.sessionStorage.user;
        $rootScope.logout = function(){
            $window.sessionStorage.user = '';
            $scope.user = $window.sessionStorage.user;
            $rootScope.user = $window.sessionStorage.user;
            //console.log('logout');
        };

        $scope.orderProp = 'name';

        $scope.location = "";
        $scope.name = "";
        $scope.restaurantname = "";
        $scope.qualityrating = 0;
        $scope.pricerating = 0;
        $scope.comment = "";
        $scope.submitted = "";
        $scope.addReview = function() {
            $scope.restaurant = $scope.restaurant.split(" | ")
            var data = {
                username: $window.sessionStorage.user, //TODO: need to change to actual username
                location: $scope.restaurant[1],
                comment: $scope.comment,
                qualityrating: parseInt($scope.qualityrating),
                pricerating: parseInt($scope.pricerating),
                restaurantname: $scope.restaurant[0]
            };
            $.post("/api/v1/reviews", data).success(function(data, status) {
            }).error(function (data, status, headers, config) {
                console.log(data);
                console.log(status);
                console.log(headers);
            });
            $scope.submitted = "Added review!";
            $scope.location = "";
            $scope.name = "";
            $scope.restaurantname = "";
            $scope.qualityrating = 0;
            $scope.pricerating = 0;
            $scope.comment = "";
        };
    }]);

restaurantController.controller('deleteRestaurantsCtrl', ['$scope', '$http','$rootScope', '$window',
    function($scope, $http, $rootScope, $window) {
        $scope.user = $window.sessionStorage.user;
        $rootScope.user = $window.sessionStorage.user;
        $rootScope.logout = function(){
            $window.sessionStorage.user = '';
            $scope.user = $window.sessionStorage.user;
            $rootScope.user = $window.sessionStorage.user;
            //console.log('logout');
        };

        $http.get('/api/v1/restaurants').success(function(data) {
            $scope.restaurants = data;
            //$scope.task = $filter('filter')(data, {_id: $scope.id})[0];
        });
        $scope.name = "";
        $scope.location = "";
        $scope.orderProp = "name";
        $scope.submitted = "Not submitted yet!";
                $scope.deleteRestaurant = function(restaurant) {
            var data = $.param({
                 name: $scope.name,
                 location: $scope.location
               
            });
        var urlName = "/api/v1/restaurants/" + $scope.location;
$http.delete(urlName).success(function(data, status){
        $scope.submitted = "Deleted restaurant!";
});
        }
        


        
    }]);

restaurantController.controller('restaurantDetailsCtrl', ['$scope', '$routeParams', '$filter','$http', '$rootScope', '$window',
    function($scope, $routeParams, $filter, $http, $rootScope, $window) {
        $scope.user = $window.sessionStorage.user;
        $rootScope.user = $window.sessionStorage.user;
        $rootScope.logout = function(){
            $window.sessionStorage.user = '';
            $scope.user = $window.sessionStorage.user;
            $rootScope.user = $window.sessionStorage.user;
            //console.log('logout');
        };
        $http.get('/api/v1/restaurants/' + $routeParams.location).success(function(data) {
            $scope.restaurant = data;
            //$scope.task = $filter('filter')(data, {_id: $scope.id})[0];
        });

        $http.get('api/v1/reviews/location/' + $routeParams.location).success(function(data){
           // $scope.reviews = data;
        });

        $scope.deleteReview = function(review){
            var urlName = "/api/v1/reviews/" + review.username + '/' + review.location;
            $http.delete(urlName).success(function (data, status) {
                $http.get('api/v1/reviews/location/' + $routeParams.location).success(function(data){
                    $scope.reviews = data;
                });
                $http.get('/api/v1/restaurants/' + $routeParams.location).success(function(data) {
                    $scope.restaurant = data;
                    //$scope.task = $filter('filter')(data, {_id: $scope.id})[0];
                });
            });
        };

        $http.get('/api/v1/restaurantInfo/' + $routeParams.location).success(function(data){
            $scope.reviews = data;
        });

        $scope.orderProp = 'name';
    }]);

restaurantController.controller('userDetailsCtrl', ['$scope', '$routeParams', '$filter','$http', '$rootScope', '$window',
    function($scope, $routeParams, $filter, $http, $rootScope, $window) {
        $scope.user = $window.sessionStorage.user;
        $rootScope.user = $window.sessionStorage.user;
        $rootScope.logout = function(){
            $window.sessionStorage.user = '';
            $scope.user = $window.sessionStorage.user;
            $rootScope.user = $window.sessionStorage.user;
            //console.log('logout');
        };
        $http.get('/api/v1/customers/' + $routeParams.username).success(function(data) {
            $scope.user = data;
        });
        $http.get('/api/v1/reviews/' + $routeParams.username).success(function(data) {
            $scope.reviews = data;
        });


        $scope.orderProp = 'name';
    }]);

restaurantController.controller('viewUsersCtrl', ['$scope', '$routeParams', '$filter','$http', '$rootScope', '$window',
    function($scope, $routeParams, $filter, $http, $rootScope, $window) {
        $scope.user = $window.sessionStorage.user;
        $rootScope.user = $window.sessionStorage.user;
        $rootScope.logout = function(){
            $window.sessionStorage.user = '';
            $scope.user = $window.sessionStorage.user;
            $rootScope.user = $window.sessionStorage.user;
            //console.log('logout');
        };
        $http.get('/api/v1/customers').success(function(data) {
            $scope.users = data;
        });
        $scope.deleteUser = function(user) {
            var data = $.param({
                username: user.username,
            });
            var urlName = "/api/v1/delCustomer/" + user.username;
            $http.delete(urlName).success(function (data, status) {
                $http.get('/api/v1/customers').success(function (data) {
                    $scope.users = data;
                });
            });
        };

        $scope.orderProp = 'username';
    }]);

restaurantController.controller('recsCtrl', ['$scope', '$routeParams', '$filter','$http', '$rootScope','$window',
    function($scope, $routeParams, $filter, $http, $rootScope, $window) {
        $scope.orderProp = 'name';

        $scope.user = $window.sessionStorage.user;
        $rootScope.user = $window.sessionStorage.user;
        $rootScope.logout = function(){
            $window.sessionStorage.user = '';
            $scope.user = $window.sessionStorage.user;
            $rootScope.user = $window.sessionStorage.user;
            //console.log('logout');
        };

        $scope.address = "";
        $scope.city = "";
        $scope.state = "";
        $scope.zipcode = "";
        $scope.distance = 2;
        $scope.minPrice = 0;
        $scope.maxPrice = 4;
        $scope.openNow = false;
        $scope.foodStyle = "";
        $scope.rankBy = google.maps.places.RankBy.PROMINENCE;
        $scope.locationInfo = "";

        var latlng;
        var latitude;
        var longitude;
        var container = document.getElementById('locResults');

//        use this when we figure out how to grab zipcode
//        $http.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + )
        $scope.getLocation = function() {
            if(navigator.getLocation)
            {
                navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
            }
            else
            {
                $scope.error = "Geolocation not support by browser."
            }
        };

        $scope.showPosition = function() {
            latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            $scope.locationInfo = "Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude;
        }

        });

        $scope.getRec = function(){
            if($scope.recType=='normal')
            {
                $http.get('/recommendations/byHistory/' + $scope.user).success(function(data){
                    $scope.restaurants = data;
                });
            }
            else //by location
            {
                var latlngurl;

                if($scope.locType == "user") // already grabbed by getlocation

                else // predef
                {
                    latlngurl = "http://maps.googleapis.com/maps/api/geocode/json?address=";
                    if($scope.address == "" && $scope.city == "" && $scope.state == "" && $scope.zipcode == "")
                        $scope.error = "Predefined address is undefined. Please try again.";
                    if($scope.address != "")
                    {
                        $scope.address.replace(/ /g, "+");
                        latlngurl.append($scope.address + ",+");
                    }
                    if($scope.city != "")
                    {
                        $scope.city.replace(/ /g, "+");
                        latlngurl.append($scope.city + ",+");
                    }
                    if($scope.state != "")
                    {
                        $scope.state.replace(/ /g, "+");
                        latlngurl.append($scope.state + ",+");
                    }
                    if($scope.zipcode != "")
                    {
                        $scope.zipcode.replace(/ /g, "+");
                        latlngurl.append($scope.zipcode + ",+")
                    }
                    latlngurl = latlngurl.substring(0,latlngurl.length - 2);
                
                    $http.get(latlngurl).success(function(data) {
                        latitude = data[0].geometry.location.lat();
                        longitutde = data[0].geometry.location.lng();
                    };

                    latlng = new google.maps.LatLng(latitude, longitude);
                }
            
                var request = {
                    location: latlng,
                    radius: $scope.distance,
                    keyword: $scope.foodStyle,
                    minPriceLevel: $scope.minPrice,
                    maxPriceLevel: $scope.maxPrice,
                    openNow: $scope.openNow,
                    rankBy: $scope.rankBy,
                    type: restaurant
                };

                var service = new google.maps.places.PlacesService(container);
                service.nearbySearch(request, callback);

                function callback(results, status)
                {
                    if(status == google.maps.places.PlacesServiceStatus.OK)
                        for (var i = 0; i < results.length; i++) {
                            container.innerHTML += results[i].name + '<br />';
                        }
                }
            }



        };


    }]);

restaurantController.controller('reviewDetailsCtrl', ['$scope', '$routeParams', '$filter','$http', '$rootScope', '$window',
    function($scope, $routeParams, $filter, $http, $rootScope, $window) {
        $scope.user = $window.sessionStorage.user;
        $rootScope.user = $window.sessionStorage.user;
        $rootScope.logout = function(){
            $window.sessionStorage.user = '';
            $scope.user = $window.sessionStorage.user;
            $rootScope.user = $window.sessionStorage.user;
            //console.log('logout');
        };

        $http.get('/api/v1/reviews/locUN/' + $routeParams.username + '/' + $routeParams.location).success(function(data){
            $scope.review = data;
        });

        $scope.getRec = function(){

        };
    }]);


restaurantController.controller('changePasswordCtrl', ['$scope', '$routeParams', '$filter','$http', '$rootScope', '$window',
    function($scope, $routeParams, $filter, $http, $rootScope, $window) {
        $scope.user = $window.sessionStorage.user;
        $rootScope.user = $window.sessionStorage.user;
        $rootScope.logout = function(){
            $window.sessionStorage.user = '';
            $scope.user = $window.sessionStorage.user;
            $rootScope.user = $window.sessionStorage.user;
            //console.log('logout');
        };

        $http.get('/api/v1/customers').success(function(data) {
            $scope.users = data;
        });

        $scope.submitted = '';

        $scope.changePassword = function(){
            var data = {username: $scope.username, password: $scope.newpassword};
            $http.put('/api/v1/changePass', data).success(function(data) {
                $scope.submitted = "Password changed successfully!";
            });
        };

    }]);
