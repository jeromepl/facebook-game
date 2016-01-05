app.factory('pushService', ['$http', 'facebookService', function ($http, facebookService) {

    return {
        sendMessage: function(friendID, message) { //Pushes a new message in the database
            return facebookService.getID().then(function(response) {
                return $http({
                    method: 'GET',
                    url: 'server_side/sendMessage.php?user_id=' + response + '&friend_id=' + friendID + '&message=' + message
                }); //Returns a promise with the response
            });
        },

        ask: function(messageId, question) { //The server-side automatically adds a question mark at the end of the question
            return facebookService.getID().then(function(response) {
                return $http({
                    method: 'GET',
                    url: 'server_side/ask.php?user_id=' + response + '&message_id=' + messageId + '&question=' + question
                });
            });
        },

        answer: function(messageId, answer) {
            return $http({
                method: 'GET',
                url: 'server_side/answer.php?message_id=' + messageId + '&answer=' + answer
            });
        }
    };
}]);
