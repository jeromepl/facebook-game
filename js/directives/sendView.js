app.directive('sendView', function() {
    return {
        restrict: 'E',
        controller: 'SendController',
        scope: {
        },
        templateUrl: 'views/sendView.html'
    };
});
