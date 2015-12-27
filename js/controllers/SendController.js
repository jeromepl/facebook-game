app.controller('SendController', ['$scope', '$location', function($scope, $location) {
    $scope.send = function() {
        //How to get the person and the message? Arguments, JQuery?
    };
    $scope.cancel = function() {
        //TODO CLEAR TEXT FIELDS
        $location.path("/");
    };
}]);
