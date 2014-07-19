define(['angular', 'js/controllers/controllers'], function (angular_, controllers) {
    'use strict';

	controllers.controller('RegCtrl', ['$scope', '$location', 'UserService', function ($scope, $location, UserService) {

		if ($scope.regData === undefined) {
			$scope.regData = {};
		}

		$scope.error = '';
		$scope.loading = false;

		$scope.register = function () {
			var regData = $scope.regData;

			if ($scope.form.$invalid === true) {
				$scope.error = 'Please fill all the fields!';
				return false;
			}

			if (regData.password && regData.password.length < 1) {
				$scope.error = 'Password must be at least 1 character!';
				return false;
			}
			if (regData.password !== regData.passwordAgain) {
				$scope.error = 'Passwords must match!';
				return false;
			}

			$scope.loading = true;
			$scope.error = '';
			var user = {username: regData.email,
				password: regData.password,
				network: 'local'};

			var reg = UserService.register(user).then(function () {
				$location.path('/');
			}, function (errorMessage) {
				$scope.loading = false;
				$scope.error = errorMessage;
			});
		};

		$scope.cancel = function () {
			if (($scope.regData.email && $scope.regData.email.trim() !== "" && confirm("Are you sure you want to loose the changes?")) ||
			 	($scope.regData.email && $scope.regData.email.trim() === "") ||
			 	($scope.regData.email === undefined)){
				$location.path('/');
			}
		};
	}]);
});