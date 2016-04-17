var app=angular.module("restaurantModule",["ngRoute", 'restaurantController']);
app.config(['$routeProvider',
    function($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'partials/home.html',
        compile: function() {
  $(document).foundation();
},
        controller: 'homeCtrl'
    }).
    when('/search', {
        templateUrl: 'partials/search.html',
        controller: 'searchCtrl'
    }).
    when('/reviews', {
        templateUrl: 'partials/reviews.html',
        controller: 'reviewCtrl'
    }).
    when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl'
    }).
    when('/newuser', {
        templateUrl: 'partials/newuser.html',
        controller: 'newuserCtrl'
    }).
    when('/addRestaurant', {
        templateUrl: 'partials/addRestaurant.html',
        controller: 'addRestaurantCtrl'
    }).
    when('/viewRestaurants', {
        templateUrl: 'partials/viewRestaurants.html',
        controller: 'viewRestaurantsCtrl'
    }).
    when('/viewRestaurants/:location', {
        templateUrl: 'partials/restaurantDetails.html',
        controller: 'restaurantDetailsCtrl'
    }).
    when('/deleteRestaurants', {
        templateUrl: 'partials/deleteRestaurants.html',
        controller: 'deleteRestaurantsCtrl'
    }).
    when('/viewUsers', {
        templateUrl: 'partials/viewUsers.html',
        controller: 'viewUsersCtrl'
    }).
    when('/viewUsers/:username', {
        templateUrl: 'partials/userDetails.html',
        controller: 'userDetailsCtrl'
    }).
    otherwise({
        redirectTo: '/home'
    });
}]);