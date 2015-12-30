app.controller('HomeController', ['$scope', '$location', 'facebookInit', function($scope, $location, facebookInit) {

    $scope.fbLoaded = false;

    facebookInit.deferred.then(function() {
        $scope.fbLoaded = true;
    });

    $scope.sendMessage = function() {
        $location.path("/sendMessage");
    };

    $scope.receiveMessage = function() {
        $location.path("/receiveMessage");
    };
}]);
