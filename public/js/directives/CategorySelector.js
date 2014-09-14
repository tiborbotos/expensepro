define(['js/directives/directives', 'angular'], function(emDirectives) {
    'use strict';

	emDirectives.directive('categorySelector', ['CategoryService', function (CategoryService) {
		return {
			restrict: 'AC',
			scope: {
				'selectedCategory': '='
			},
			controller: function($scope) {
				$scope.categories = undefined;
				var self = this;
				var previousSelectedSubCategory = undefined;

				$scope.showSubCategories = function (category) {
					if (previousSelectedSubCategory !== undefined) {
						previousSelectedSubCategory.selectedsubcategory = false;
					}
					previousSelectedSubCategory = category;
					category.selectedsubcategory = true;
				};

				$scope.selectCategory = function (category) {
					$scope.selectedCategory = category;
				};

				$scope.init = function () {
					self.previousSelectedSubCategory = undefined;
					CategoryService.categories(function (data) {
						$scope.categories = data;
						$scope.$apply();
					});
				}

				$scope.init();
			},
			name: 'categorySelector',
			templateUrl: 'js/directives/CategorySelector.html'
		}
	}]);

});