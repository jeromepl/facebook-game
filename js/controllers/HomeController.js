app.controller('HomeController', ['$scope', '$location', '$routeParams', 'facebookService', 'pullService', function($scope, $location, $routeParams, facebookService, pullService) {

    $scope.firstName = "";
    $scope.numMessages = 0; //Used to display the number of pending messages

    if($routeParams.msg) //User has been redirected from a notification. Need to send him to the receiveMessage page
        $location.path('/chat/' + $routeParams.msg); //$routeParams.msg contains the message id

    facebookService.getFirstName().then(function(response) {
         $scope.firstName = response;
    }, function(response) {
        console.log("Error: " + response);
    });

    pullService.getNumMessages().then(function(response) {
        $scope.numMessages = response.data;
    }, function(response) {
        console.log("Error: " + response);
    });

    $scope.sendMessage = function() {
        $location.path("/sendMessage");
    };

    $scope.receiveMessage = function() {
        $location.path("/receiveMessage");
    };

    $scope.inviteFriends = function() {
        //TODO
    };
}]);
