app.controller('HomeController', ['$scope', '$location', function($scope, $location) {

    $scope.sendMessage = function() {
        $location.path("/sendMessage");
    };

    $scope.receiveMessage = function() {
        $location.path("/receiveMessage");
    };
}]);
