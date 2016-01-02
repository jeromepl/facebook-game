app.controller('ReceiveController', ['$scope', '$location', 'pullService', function($scope, $location, pullService) {

    $scope.messages = [];

    //Load the first message:
    pullService.getMessages().then(function(response) {
        $scope.messages = response.data;
    }, function(response) {
        console.log("An error occured: " + response);
    });

    $scope.select = function(index) {
        $location.path("/chat/" + $scope.messages[index].id);
    };

    //Go back to the home page
    $scope.back = function() {
        $location.path("/app.html/");
    };

}]);
