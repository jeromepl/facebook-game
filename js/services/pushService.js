app.factory('pushService', ['$http', 'facebookService', function ($http, facebookService) {

    return {
        sendMessage: function(friendID, message) { //Pushes a new message in the database
            return facebookService.getID().then(function(response) {
                return $http({
                    method: 'GET',
                    url: 'server_side/sendMessage.php?user_id=' + response.id + '&friend_id=' + friendID + '&message=' + message
                }); //Returns a promise with the response
            });
        }
    };
}]);
