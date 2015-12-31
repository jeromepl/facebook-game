app.controller('HomeController', ['$scope', '$location', 'facebookService', function($scope, $location, facebookService) {

    $scope.firstName = "";

    facebookService.getFirstName().then(function(response) {
         $scope.firstName = response;
    }, function(response) {
        console.log(response);
    });

    $scope.sendMessage = function() {
        $location.path("/sendMessage");
    };

    $scope.receiveMessage = function() {
        $location.path("/receiveMessage");
    };
}]);
