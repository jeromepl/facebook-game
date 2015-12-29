app.controller('ReceiveController', ['$scope', '$location', 'facebookService', 'pullService', function($scope, $location, facebookService, pullService) {

    $scope.message = "Loading...";
    $scope.pictures = ['img/loop.png', 'img/loop.png', 'img/loop.png', 'img/loop.png', 'img/loop.png'];

    //Load the first message:
    var messages = [];
    pullService.getMessages().then(function(response) {
        messages = response.data;

        //Show the first message
        $scope.message = messages[0].message;
        loadPictures(messages[0].friends);
    }, function(response) {
        console.log("An error occured: " + response);
    });

    //Go back to the home page
    $scope.back = function() {
        $location.path("/");
    };

    //Takes the friend ids and gets their pictures to put in the $scope.pictures
    function loadPictures(friends) {
        if(friends.length == 5) {
            for(var i = 0; i < 5; i++) {
                if(friends[i] && friends[i] != 0)
                    $scope.pictures[i] = facebookService.getFriendPicture(friends[i]);
                else
                    $scope.pictures[i] = 'img/question-mark.png'; //Occurs when user doesn't have enough friends to fill all spots
            }
        }
    }
}]);
