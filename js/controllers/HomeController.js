app.controller('HomeController', ['$scope', 'facebookService', function($scope, facebookService) {
    //$scope.last_name = facebookService.getMyLastName(); TODO: This throws and error since FB is not initialized at this point (asynchronous call)
    $scope.sendMessage = function() {
        $scope.$parent.isHomeVisible = false;
        $scope.$parent.isSendVisible = true;
    };
}]);
