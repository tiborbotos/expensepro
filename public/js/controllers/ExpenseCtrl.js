define(['angular', 'js/controllers/controllers', 'js/model/UserService'], function (angular_, controllers) {
	'use strict';

	controllers.controller('ExpenseCtrl', ['$scope', 'UserService',
		function($scope) {

			$scope.editedTransaction = {};
			$scope.loading = false;

			$scope.create = function () {
			};

			$scope.saveTransaction = function (data) {
				console.log($scope.editedTransaction);
			};

			(function init() {
				$scope.editedTransaction = {'amount': 0,
					'category': {},
					'date': new Date()};
			})();

			console.log('start');
		}]);
});