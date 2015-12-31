angular.module('facebookInit', [])
    .factory('facebookInit', ['$q', '$rootScope', function ($q, $rootScope) {

        function init() {
            $rootScope.$apply(function () {
                deferred1.resolve();
            });
        }

        var deferred1 = $q.defer(); //When facebook calls fbAsyncInit
        var deferred2 = $q.defer(); //The final promise that needs to be solved

        deferred1.promise.then(function () {
            FB.init({
                appId: '739207966223708',
                xfbml: true,
                cookie: true, //Allows server to access the access token
                version: 'v2.5'
            });

            function onLogin(response) {
                if (response.status == 'connected') {
                    deferred2.resolve(response);
                }
                else {
                    deferred2.reject('Error occured: ' + response);
                }
            }

            FB.getLoginStatus(function (response) {
                // Check login status on load, and if the user is
                // already logged in, go directly to the welcome message.
                if (response.status == 'connected') {
                    onLogin(response);
                } else {
                    // Otherwise, show Login dialog first.
                    FB.login(function (response) {
                        onLogin(response);
                    }, {
                        scope: 'user_friends, email'
                    });
                }
            });
        });

        window.fbAsyncInit = angular.bind(this, init);

        //Load the SDK Asynchronously
       (function(d){
          var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement('script'); js.id = id; js.async = true;
          js.src = "//connect.facebook.net/en_US/all.js";
          ref.parentNode.insertBefore(js, ref);
        }(document));

        return {
            instantiated: deferred1.promise, //A promise resolved when FB has loaded
            logged: deferred2.promise //A promise resolved when FB user is logged in
        }
}]);
