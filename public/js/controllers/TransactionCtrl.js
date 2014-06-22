define(['angular', 'js/controllers/controllers'], function (angular_, controllers) {
    'use strict';

	controllers.controller('TransactionCtrl', ['$scope', 'TransactionModel', 'UserService',
		function($scope, TransactionModel, UserService) {

		var emUser = 'umuser';
		var emPwd = 'a,fj&hass1a3KL';

		$scope.editedTransaction = {};
		$scope.loading = false;

		$scope.create = function () {
		};

		$scope.saveTransaction = function () {
			$scope.loading = true;
			UserService.user(function (user) {
				$scope.editedTransaction.userid = user.id;
				//$scope.editedTransaction.useremail = user.email;
				console.log("Save transaction", $scope.editedTransaction);
				$scope.loading = false;
			});

//			TransactionModel.saveTransaction($scope.editedTransaction, function (savedTransaction) {
//				$scope.loading = false;
//				$scope.transaction = {};
//			});
		};
	}]);
});