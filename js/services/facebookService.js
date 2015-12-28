app.factory('facebookService', function ($q) {

    return {
        getID: function () {
            var deferred = $q.defer();

            FB.api('/me?fields=id', function (response) {
                if (!response || response.error) {
                    deferred.reject('Error occured: ' + response.error.message);
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        },

        getFriends: function () {
            var deferred = $q.defer();

            FB.api('/me/friends?limit=5000', function (response) {
                if (!response || response.error) {
                    deferred.reject('Error occured: ' + response.error.message);
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        },

        getAllFriends: function () {
            var deferred = $q.defer();

            FB.api('/me/taggable_friends?limit=5000', function (response) {
                if (!response || response.error) {
                    deferred.reject('Error occured: ' + response.error.message);
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        },

        getFriendPicture: function (friendID) {
            return "https://graph.facebook.com/" + friendID + "/picture?type=square";
        }
    };
});
