app.factory('pullService', ['$http', 'facebookService', function ($http, facebookService) {

    return {
        getNumMessages: function() {
            return facebookService.getID().then(function(response) {
                return $http({
                    method: 'GET',
                    url: 'server_side/getNumMessages.php?user_id=' + response
                });
            });
        },

        getMessage: function(messageId) {
            return $http({
                method: 'GET',
                url: 'server_side/getMessage.php?message_id=' + messageId
            });
        },

        getMessages: function() { //Pushes a new message in the database
            return facebookService.getID().then(function(response) {
                return $http({
                    method: 'GET',
                    url: 'server_side/getMessages.php?user_id=' + response
                }); //Returns a promise with the response
            });
        },

        guess: function(messageId, guess) {
            return $http({
                method: 'GET',
                url: 'server_side/guess.php?message_id=' + messageId + '&guess=' + guess
            });
        }
    };
}]);
