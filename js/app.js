var app = angular.module("facebookApp", ['ngRoute']);

//Routing
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'views/homeView.html'
        })
        .when('/sendMessage/', {
            controller: 'SendController',
            templateUrl: 'views/sendView.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
