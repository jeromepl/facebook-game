app.controller('HomeController', ['$scope', '$location', 'facebookService', function($scope, $location, facebookService) {

    $scope.sendMessage = function() {
        $location.path("/sendMessage");
    };
}]);
