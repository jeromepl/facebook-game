app.directive('homeView', function() {
    return {
        restrict: 'E',
        controller: 'HomeController',
        scope: {
        },
        templateUrl: 'views/homeView.html'
    };
});
