define(['js/model/model', 'dpd'], function(emModel) {
	'use strict';

    emModel.service('UserService', ['$q', function($q) {
		var self = this;

		var session = {};
		var me = {};

		this.loggedIn = false;

		this.register = function (user) {
			user.password = secure(user.password);
			var saltedPass = user.password;
			console.log('User registration', user);

			var deferred = $q.defer();
			dpd.users.post(user, function (user, error) {
				if (error) {
					console.log('Error during registration', error);
					var message = 'Jesus! A non translated error happened in the server!';
					if (error.errors && error.errors['username'] === 'is already in use') {
						message = 'Snap! The username is taken';
					}
					deferred.reject(message);
				} else {
					// login
					self.login(user.username, saltedPass, true).then(function (session) {
						deferred.resolve();
					}, function (error) {
						console.log('Failed to login after register!', error);
						deferred.resolve();
					});
				}
			});
			return deferred.promise;
		}

		this.login = function (username, password, passwordSalted) {
			var deferred = $q.defer();
			var p = passwordSalted ? password : secure(password);
			dpd.users.login({username: username, password: p}, function(session, error) {
				console.log('Login result',session, error);
				if (error) {
					deferred.reject(error.message);
				} else {
					self.session = session;

					dpd.users.me(function (me, error) {
						if (error) {
						} else {
							self.me = me;
						}

						self.loggedIn = true;
						deferred.resolve(session);
					});
				}
			});

			return deferred.promise;
		};

		this.logout = function () {
			dpd.users.logout(function (result, error) {
				self.loggedIn = false;
				self.me = undefined;
			});
		};

		function secure(p) {
			return sha1(p + 'x*(nq3423zxxas)qwsabxfhg3fdqxdwer[vx.c12zxcer321//01a');
		}

function sha1(c){var l=function(a,b){return a<<b|a>>>32-b},n=function(a){var b="",c,d;for(c=7;0<=c;c--)d=a>>>4*c&15,b+=d.toString(16);return b},a,d,g=Array(80),p=1732584193,q=4023233417,r=2562383102,s=271733878,t=3285377520,b,e,f,h,k;c=unescape(encodeURIComponent(c));b=c.length;var m=[];for(a=0;a<b-3;a+=4)d=c.charCodeAt(a)<<24|c.charCodeAt(a+1)<<16|c.charCodeAt(a+2)<<8|c.charCodeAt(a+3),m.push(d);switch(b%4){case 0:a=2147483648;break;case 1:a=c.charCodeAt(b-1)<<24|8388608;break;case 2:a=c.charCodeAt(b-
2)<<24|c.charCodeAt(b-1)<<16|32768;break;case 3:a=c.charCodeAt(b-3)<<24|c.charCodeAt(b-2)<<16|c.charCodeAt(b-1)<<8|128}for(m.push(a);14!=m.length%16;)m.push(0);m.push(b>>>29);m.push(b<<3&4294967295);for(c=0;c<m.length;c+=16){for(a=0;16>a;a++)g[a]=m[c+a];for(a=16;79>=a;a++)g[a]=l(g[a-3]^g[a-8]^g[a-14]^g[a-16],1);d=p;b=q;e=r;f=s;h=t;for(a=0;19>=a;a++)k=l(d,5)+(b&e|~b&f)+h+g[a]+1518500249&4294967295,h=f,f=e,e=l(b,30),b=d,d=k;for(a=20;39>=a;a++)k=l(d,5)+(b^e^f)+h+g[a]+1859775393&4294967295,h=f,f=e,e=
l(b,30),b=d,d=k;for(a=40;59>=a;a++)k=l(d,5)+(b&e|b&f|e&f)+h+g[a]+2400959708&4294967295,h=f,f=e,e=l(b,30),b=d,d=k;for(a=60;79>=a;a++)k=l(d,5)+(b^e^f)+h+g[a]+3395469782&4294967295,h=f,f=e,e=l(b,30),b=d,d=k;p=p+d&4294967295;q=q+b&4294967295;r=r+e&4294967295;s=s+f&4294967295;t=t+h&4294967295}k=n(p)+n(q)+n(r)+n(s)+n(t);return k.toLowerCase()};

	}]);
});