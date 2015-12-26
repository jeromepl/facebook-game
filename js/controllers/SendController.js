app.controller('SendController', ['$scope', function($scope) {
    $scope.send = function() {
        //How to get the person and the message? Arguments, JQuery?
    };
    $scope.cancel = function() {
        //TODO CLEAR TEXT FIELDS
        $scope.$parent.isSendVisible = false;
        $scope.$parent.isHomeVisible = true;
    };
}]);
