app.factory('pullService', ['$http', 'facebookService', function ($http, facebookService) {

    return {
        getMessages: function() { //Pushes a new message in the database
            return facebookService.getID().then(function(response) {
                return $http({
                    method: 'GET',
                    url: 'server_side/getMessages.php?user_id=' + response.id
                }); //Returns a promise with the response
            });
        }
    };
}]);
