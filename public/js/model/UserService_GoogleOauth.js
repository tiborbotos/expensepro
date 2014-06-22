define(['js/model/model', 'angular', 'hello'], function(emModel) {
	'use strict';

    emModel.service('UserService', ['$http', function($http) {
    	var _apiKey = 'K9nhjsr3jcTL9tlwf2WDSBw0TdYqYROWYPSGrXg2';
		var _user = undefined;
		var _onLoginSuccess = undefined;
		var _onLoginFailed = undefined;
		var _userId;

		var that = this;

		this.userSessions = {
			loggedIn: false,
			google: undefined
		};
		this.loggedIn = function () {
			return onlineSession(googleSession);
		};

		this.user = function (success, failure) {
			if (this._user == undefined) {
				this._onLoginSuccess = success;
				this._onLoginFailed = failure;
				login(failure);
			} else {
				if (success) {
					success(this._user);
				}
			}
		}

		this.logout = function () {
			logout();
		}

		this.userId = function (success, failure) {
			if (this._user == undefined) {
				this.user(function (user) {
					success(user.id);
				});
			} else {
				success(this.user.id);
			}
		}

		this.register = function (success) {
			that._onLoginSuccess = registerCallback;
			login();
		}

		var registerCallback = function (user) {
			user.registered = new Date();
			user.network = 'google';

			$http({
				url: 'https://api.mongolab.com/api/1/databases/em/collections/users?apiKey=' + that._apiKey,
				method: 'POST',
				data: JSON.stringify( user )
			}).success(function (data) {
				console.log('User registered ', data);
				initUserSessions();
				success(user);
			}).error(function(data, status, headers, config) {
				console.log('Failed to register user! ', data);
				console.log('Status ', status);
				logout();
			});
		}

		function login (onFailed) {
			hello.login('google', function (event) {
				console.log('Hello login callback ', event);
				if (event.error && onFailed) {
					onFailed(event); //event.error.code === 'blocked'
				}
			});
		}

		function logout () {
			hello.logout('google', function () {
				console.log('Signed out!');
			});
		}

		hello.on('auth.login', function (r) {
			hello( r.network ).api( '/me' ).success( function (user){
				console.log('Information about me ', user);
				that._user = user;

				if (that._onLoginSuccess) {
					that._onLoginSuccess(user);
				}
			});
		});

		hello.on( "auth.failed", function (event){
			console.log( "auth.failed", event);
			if (that._onLoginFailed) {
				that._onLoginFailed(event);
			}
		});

		hello.init({
			google: {
				id: '149645213317-o3ekt42c2jilp8dq04rsmafj04jqub0e.apps.googleusercontent.com'
			}
		});

		// init and get data from sessions

		function initUserSessions() {
			that.userSessions.google = hello( 'google' ).getAuthResponse();
			that.userSessions.loggedIn = onlineSession(that.userSessions.google);
			if (that.userSessions.loggedIn === true && that._user === undefined) {
				login();
			}
		}

		// PRIVATE METHODS


		function onlineSession (session){
			var current_time = (new Date()).getTime() / 1000;
			return session && session.access_token && session.expires > current_time;
		};


	}]);

});