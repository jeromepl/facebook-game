app.controller('HomeController', ['$scope', '$location', '$routeParams', 'facebookService', 'pullService', function($scope, $location, $routeParams, facebookService, pullService) {

    $scope.firstName = "";
    $scope.numMessages = "no"; //Used to display the number of pending messages. "no" is the same as 0 messages pending

    if($routeParams.msg) //User has been redirected from a notification. Need to send him to the receiveMessage page
        $location.path('/receiveMessage/' + $routeParams.msg); //$routeParams.msg contains the message id

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
