var app = angular.module("facebookApp", ['ngRoute', 'facebookInit']);

//Routing
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
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
        .when('/receiveMessage/', {
            controller: 'ReceiveController',
            templateUrl: 'views/receiveView.html',
            resolve: {
                'fbLoaded': function(facebookInit) {
                    return facebookInit.logged;
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });
});
