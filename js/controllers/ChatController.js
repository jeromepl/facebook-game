app.controller('ChatController', ['$scope', '$location', '$routeParams', 'facebookService', 'pushService', 'pullService', function($scope, $location, $routeParams, facebookService, pushService, pullService) {

    $scope.message = "Hello, World!";
    $scope.sender = true;
    $scope.chat = []; //Contains all questions and their answers

    $scope.guessPictures = ['img/question-mark.png', 'img/question-mark.png', 'img/question-mark.png'];
    $scope.receiverPicture = 'img/question-mark.png'; //Shows only if user is the sender

    //The message id is contained in $routeParams.id
    //$scope.question contains the content of the text input, if the user is not the sender

    //Load the content
    pullService.getMessage($routeParams.id).then(function(response) {
        $scope.chat = response.data.chat;
        $scope.sender = response.data.sender;
        $scope.message = response.data.message;

        if($scope.sender)
            $scope.receiverPicture = facebookService.getFriendPicture(response.data.receiver, "normal");
        loadPictures(response.data.guesses);
    }, function(response) {
        console.log("Error: " + response);
    });

    $scope.ask = function() {
        if(!$scope.sender && $scope.question.length > 0 && $scope.question.length <= 144) {
            //If the user put a question mark at the end of the question, remove it since the server side already adds one
            if($scope.question.charAt($scope.question.length - 1) == '?')
                $scope.question = $scope.question.substring(0, $scope.question.length - 1);

            pushService.ask($routeParams.id, $scope.question).then(function(response) {
                console.log(response.data);
            }, function(response) {
                console.log("Error: " + response);
            });

            //Update the view
            $scope.chat.push($scope.question + '?');
            $scope.question = ""; //Clear the text field
        }
    };

    $scope.answer = function(yes) { //"yes" is a boolean saying whether the answer was positive or negative
        if($scope.sender) {
            var answer = "No";
            if(yes)
                answer = "Yes";

            pushService.answer($routeParams.id, answer).then(function(response) {
                console.log(response.data);
            }, function(response) {
                console.log("Error: " + response);
            });

            //Update the view
            $scope.chat[$scope.chat.length - 1].answer = answer;
        }
    };

    $scope.guess = function() {
        //TODO
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
