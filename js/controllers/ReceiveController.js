app.controller('ReceiveController', ['$scope', '$location', '$routeParams', 'facebookService', 'pullService', function($scope, $location, $routeParams, facebookService, pullService) {

    $scope.message = "Loading...";
    $scope.pictures = ['img/loop.png', 'img/loop.png', 'img/loop.png', 'img/loop.png', 'img/loop.png'];

    $scope.currentMessageIndex = 0;
    $scope.numMessages = 0;
    var currentMessageId = 0;

    $scope.selected = null; //To guess
    $scope.guessAnswer = "wrong"; //Use as a CSS class to style the guess message. Either "right" or "wrong"
    $scope.guessMessage = null;

    //Load the first message:
    var messages = [];
    pullService.getMessages().then(function(response) {
        messages = response.data;
        $scope.numMessages = messages.length;

        if($scope.numMessages > 0) {
            if($routeParams.id) { //User redirected from notifications. Wants to see a specific message
                var index = findMessageIndex($routeParams.id);
                if(index)
                    loadMessage(index);
                else //findMessageIndex returned null because it didn't find the message
                    loadMessage(0);
            }
            else {
                loadMessage(0); //Show the first message
            }
        }
    }, function(response) {
        console.log("An error occured: " + response);
    });

    $scope.previous = function() {
        if($scope.currentMessageIndex > 0) {
            loadMessage($scope.currentMessageIndex - 1);
        }
    };

    $scope.next = function() {
        if($scope.currentMessageIndex < $scope.numMessages - 1) {
            loadMessage($scope.currentMessageIndex + 1);
        }
    };

    $scope.select = function(index) {
        $scope.selected = index;
    };

    $scope.guess = function() {
        if($scope.selected != null) {
            pullService.guess(currentMessageId, $scope.selected).then(function(response) {
                if(response.data == 'true') {
                    $scope.guessAnswer = "right";
                    $scope.guessMessage = "You guessed right!!";
                }
                else {
                    $scope.guessAnswer = "wrong";
                    $scope.guessMessage = "Sorry, you guessed wrong!";
                }
            }, function(response) { //Error!
                $scope.guessAnswer = "wrong"; //Will display the message in red
                $scope.guessMessage = "Hmmm... An error occured...";
                console.log("Error: " + response);
            });
        }
    };

    //Go back to the home page
    $scope.back = function() {
        $location.path("/app.html/");
    };

    //Used to add the "selected" class to one of the mugshots
    $scope.isSelected = function(index) {
        if(index == $scope.selected) {
            return "selected";
        }
        return "";
    };

    function loadMessage(index) {
        var previousMessage = $scope.currentMessageIndex;

        $scope.currentMessageIndex = index;
        $scope.message = messages[index].message;
        loadPictures(messages[index].friends);
        currentMessageId = messages[index].id;

        //Delete the previous message if it was guessed
        if($scope.guessMessage) {
            removeMessage(previousMessage);
        }

        //Reset
        $scope.guessMessage = null;
        $scope.selected = null; //Deselect everything
    }

    //Takes the friend ids and gets their pictures to put in the $scope.pictures
    function loadPictures(friends) {
        if(friends.length == 5) {
            for(var i = 0; i < 5; i++) {
                if(friends[i] && friends[i] != 0 && friends[i] != "null")
                    $scope.pictures[i] = facebookService.getFriendPicture(friends[i], "large");
                else
                    $scope.pictures[i] = 'img/question-mark.png'; //Occurs when user doesn't have enough friends to fill all spots
            }
        }
    }

    //We need to remove messages that have been guessed when the user clicks on "previous" or "next"
    function removeMessage(index) {
        messages.splice(index, 1);
        $scope.numMessages = messages.length; //Update the total message count

        if($scope.currentMessageIndex > index) //The index changes for everything after the deleted message
            $scope.currentMessageIndex--;
    }

    function findMessageIndex(messageId) {
        for(var i = 0; i < messages.length; i++) {
            if(messages[i].id == messageId)
                return i;
        }

        return null; //If the message wasn't found
    }
}]);
