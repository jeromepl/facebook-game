app.controller('HomeController', ['$scope', '$location', 'facebookService', function($scope, $location, facebookService) {
    //$scope.last_name = facebookService.getMyLastName(); TODO: This throws and error since FB is not initialized at this point (asynchronous call)
    $scope.sendMessage = function() {
        $location.path("/sendMessage");
    };
}]);
