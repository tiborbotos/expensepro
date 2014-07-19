define(['angular', 'js/controllers/controllers', 'js/model/UserService', 'angular-ui-bootstrap', 'hello'], function (angular_, controllers) {
    'use strict';

	controllers.controller('UserCtrl', ['$scope', '$location', '$http', 'UserService', '$modal',
		function($scope, $location, $http, UserService, $modal) {
			$scope.login = function () {
				var modalInstance = $modal.open({
					templateUrl: 'loginModalContent.html',
					controller: LoginInstanceCtrl,
					size: 'sm',
					resolve: {
					}
				});

			};

			$scope.logout = function () {
				UserService.logout();
			};

			$scope.loggedIn = function () {
				return UserService.loggedIn;
			};

			$scope.showRegistration = function () {
				$location.path('/#/registration');
			};

	}]);

	var LoginInstanceCtrl = function ($scope, $modalInstance, UserService) {

		$scope.error = '';

    	$scope.login = function () {
    		var email = $('#loginEmail').val();
    		var pass = $('#loginPass').val();

    		if (email && pass) {
    			//
    			UserService.login(email, pass).then(function (user) {
					$modalInstance.close('');
    			}, function (error) {
    				console.log('Error: ', error);
    				$scope.error = error;
    			});
    		}
    	}

    	$scope.cancel = function () {
    		$modalInstance.dismiss('cancel');
    	}

	};

});