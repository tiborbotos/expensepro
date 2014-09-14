define(['js/directives/directives', 'angular'], function(emDirectives) {
	'use strict';

	emDirectives.directive('transactionEditor', [function() {
		return {
			restrict: 'AC',
			scope: {
				'transaction': '=',
				'save': '&'
			},
			controller: function($scope) {
				$scope.dateVisible = false;
				$scope.date = "";
				$scope.transaction = {'amount': 0,
					'category': {},
					'date': new Date()};

				var currency = {'name': 'HUF',
					'label': 'Ft',
					'decimals': 0
				};
				var today = new Date();

				$scope.transactionDate = function () {
					var td = $scope.transaction.date;
					if (td.getFullYear() == today.getFullYear()
						&& td.getMonth() == today.getMonth()
						&& td.getDate() == today.getDate()) {
						return "ma";
					} else {
						return td.getFullYear() + "-" + (td.getMonth() + 1) + "-" + td.getDate();
					}
				};

				$scope.saveTransaction = function () {
					$scope.save();
				};

				$scope.cancel = function() {
					$scope.transaction.id = undefined;
					$scope.save($scope.transaction);
				};

				$scope.formattedAmount = function () {
					function format(n, sep, decimals) {
						sep = sep || "."; // Default to period as decimal separator
						decimals = decimals || 2; // Default to 2 decimals

						return n.toLocaleString().split(sep)[0]
							+ sep
							+ n.toFixed(decimals).split(sep)[1];
					}

					var amount;
					if (isNaN($scope.transaction.amount)) {
						amount = 0;
					} else {
						amount = $scope.transaction.amount;
					}
					return format(amount, ".", currency.decimals) + " " + currency.label;
				};
			},
			name: 'transactionEditor',
			templateUrl: 'js/directives/transactionEditor.html'
		};
	}]);
});