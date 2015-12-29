app.controller('ReceiveController', ['$scope', '$location', 'facebookService', 'pullService', function($scope, $location, facebookService, pullService) {

    $scope.message = "Loading...";
    $scope.pictures = ['img/loop.png', 'img/loop.png', 'img/loop.png', 'img/loop.png', 'img/loop.png'];

    $scope.currentMessage = 0;
    $scope.numMessages = 0;

    //Load the first message:
    var messages = [];
    pullService.getMessages().then(function(response) {
        messages = response.data;
        $scope.numMessages = messages.length;

        if($scope.numMessages > 0)
            loadMessage(0); //Show the first message
    }, function(response) {
        console.log("An error occured: " + response);
    });

    $scope.previous = function() {
        if($scope.currentMessage > 0) {
            $scope.currentMessage--;
            loadMessage($scope.currentMessage);
        }
    };

    $scope.next = function() {
        if($scope.currentMessage < $scope.numMessages - 1) {
            $scope.currentMessage++;
            loadMessage($scope.currentMessage);
        }
    };

    //Go back to the home page
    $scope.back = function() {
        $location.path("/");
    };

    function loadMessage(index) {
        $scope.message = messages[index].message;
        loadPictures(messages[index].friends);
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
}]);
