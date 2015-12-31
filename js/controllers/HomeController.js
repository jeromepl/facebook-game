app.controller('HomeController', ['$scope', '$location', 'facebookService', 'pullService', function($scope, $location, facebookService, pullService) {

    $scope.firstName = "";
    $scope.numMessages = "no"; //Used to display the number of pending messages. "no" is the same as 0 messages pending

    facebookService.getFirstName().then(function(response) {
         $scope.firstName = response;
    }, function(response) {
        console.log("Error: " + response);
    });

    pullService.getNumMessages().then(function(response) {
        $scope.numMessages = response.data;

        if($scope.numMessages == 0) //Edit the displayed text if there are no pending messages
            $scope.numMessages = "no";
    }, function(response) {
        console.log("Error: " + response);
    });

    $scope.sendMessage = function() {
        $location.path("/sendMessage");
    };

    $scope.receiveMessage = function() {
        $location.path("/receiveMessage");
    };
}]);
