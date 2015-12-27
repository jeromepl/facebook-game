app.factory('facebookService', function ($q) {

    return {
        getMyLastName: function () {
            var deferred = $q.defer();

            FB.api('/me?fields=last_name', function (response) {
                console.log(response.error);
                if (!response || response.error) {
                    deferred.reject('Error occured: ' + response.error.message);
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }/*,

        setFirstName: function () {
            FB.api('/me?fields=first_name', function (data) {
                var welcomeBlock = document.getElementById('fb-welcome');
                welcomeBlock.innerHTML = 'Hello, ' + data.first_name + '!';
            });
        }*/
    };
});
