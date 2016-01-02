app.controller('ChatController', ['$scope', '$location', '$routeParams', 'pullService', 'facebookService', function($scope, $location, $routeParams, pullService, facebookService) {

    $scope.message = "Hello, World!";
    $scope.sender = true;

    $scope.guessPictures = ['img/question-mark.png', 'img/question-mark.png', 'img/question-mark.png'];

    //$scope.question contains the content of the text input, if the user is not the sender

    //Load the content
    pullService.getMessage($routeParams.id).then(function(response) {
        //console.log(response.data);

        $scope.message = response.data.message;
        loadPictures(response.data.guesses);
    }, function(response) {
        console.log("Error: " + response);
    });

    $scope.ask = function() {
        if(!$scope.sender) {
            //Send $scope.question to the server here
        }
    };

    $scope.answer = function(yes) { //"yes" is a boolean saying whether the answer was positive or negative
        if($scope.sender) {

        }
    };

    $scope.guess = function() {

    };

    $scope.back = function() {
        $location.search('msg', null); //Need to clear the msg id otherwise the home controller will send us back to this page
        $location.path("/receiveMessage");
    };


    function loadPictures(ids) {
        if(ids.length == 3) {
            for(var i = 0; i < 3; i++) {
                if(ids[i] && ids[i] != 0 && ids[i] != "null")
                    $scope.guessPictures[i] = facebookService.getFriendPicture(ids[i], "normal");
                else
                    $scope.guessPictures[i] = 'img/question-mark.png'; //Occurs when user doesn't have enough friends to fill all spots
            }
        }
    }
}]);
