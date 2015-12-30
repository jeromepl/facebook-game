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

        getFriends: function () { //Only returns friends who logged in this app
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

        getAllFriends: function () { //Uses "taggable friends" in order to get friends that do not use this app
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

        getFriendPicture: function (friendID, type) {
            return "https://graph.facebook.com/" + friendID + "/picture?type=" + type;
        }
    };
});
