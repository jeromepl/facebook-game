var app = angular.module("facebookApp", ['ngRoute', 'facebookInit']);

//Routing
app.config(function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/app.html/', { //Can't simply be '/' for some reason since I can't seem to get access to the params in the URL that way
            controller: 'HomeController',
            templateUrl: 'views/homeView.html',
            resolve: { //Wait for facebook to initialize and for the user to log in before instantiating the controller
                'fbLoaded': function(facebookInit) {
                    return facebookInit.logged;
                }
            }
        })
        .when('/sendMessage/', {
            controller: 'SendController',
            templateUrl: 'views/sendView.html',
            resolve: {
                'fbLoaded': function(facebookInit) {
                    return facebookInit.logged;
                }
            }
        })
        .when('/receiveMessage/:id?', {
            controller: 'ReceiveController',
            templateUrl: 'views/receiveView.html',
            resolve: {
                'fbLoaded': function(facebookInit) {
                    return facebookInit.logged;
                }
            }
        })
        .otherwise({
            redirectTo: '/app.html/'
        });
});
