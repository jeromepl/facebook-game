app.controller('SendController', ['$scope', '$location', 'facebookService', 'pushService', function($scope, $location, facebookService, pushService) {

    $scope.friendMatches = [];
    $scope.showSelectedFriend = false;
    $scope.selectedFriend = null;

    var retrievingFriends = false;
    var friends = null;

    //$scope.sendTo and $scope.message are defined in sendView.html and contain the values in the two text fields

    $scope.typingName = function() {
        if(!retrievingFriends) {
            retrievingFriends = true;
            facebookService.getFriends().then(function (response) {
                friends = response.data;
                searchFriends($scope.sendTo);
            });
        }

        //Search for a friend in the taggable friend list
        searchFriends($scope.sendTo);
    };

    $scope.send = function() {
        if($scope.selectedFriend && $scope.message.length > 0) { //TODO add a minimum length?
            pushService.sendMessage($scope.selectedFriend.id, $scope.message).then(function(response) { //TODO remove .then() (used to test pushService atm)
                console.log(response.data);
            }, function(response) {
                console.log('Error: ' + response.data);
            }).finally(function() {
                $location.path("/"); //TODO return confirmation message (or error) to show on the home screen
            });
        }
    };

    $scope.cancel = function() {
        $location.path("/"); //Go back to the home screen
    };

    $scope.hideDropdown = function() { //The dropdown won't close by itself. We need to close it when the input field looses focus
          $('#friends-dropdown').removeClass('open');
    };

    $scope.selectFriend = function(key) {
        if(friends) { //Show and update who the message is going to be sent to
            $scope.selectedFriend = $scope.friendMatches[key];
            $scope.sendTo = $scope.selectedFriend.name; //Put the full name in the text field
            $scope.showSelectedFriend = true;
        }
    };

    function searchFriends(name) {
        $scope.matches = [];

        if(friends) {
            for(var i = 0; i < friends.length; i++) {
                if(friends[i].name.toLowerCase().indexOf(name.toLowerCase()) > -1) { //Check if the name contains the typed text (case insensitive)
                    $scope.friendMatches.push({id: friends[i].id, name: friends[i].name, picture: facebookService.getFriendPicture(friends[i].id)});
                }
            }
        }

        $('#friends-dropdown').addClass('open'); //Opens the bootstrap dropdown menu
    }
}]);
