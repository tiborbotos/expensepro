define(['js/directives/directives', 'angular'], function(emDirectives) {
    'use strict';

	emDirectives.directive('categorySelector', function (CategoryModel) {
		return {
			restrict: 'AC',
			scope: {
				'selectedCategory': '='
			},
			controller: function($scope) {
				$scope.categories = undefined;
				var previousSelectedSubCategory = undefined;
				init();

				$scope.showSubCategories = function (category) {
					if (previousSelectedSubCategory !== undefined) {
						previousSelectedSubCategory.selectedsubcategory = false;
					}
					previousSelectedSubCategory = category;
					category.selectedsubcategory = true;
				}

				$scope.selectCategory = function (category) {
					$scope.selectedCategory = category;
				}

				function init() {
					CategoryModel.categories(function (data) {
						$scope.categories = data;
					});
				}
			},
			name: 'categorySelector',
			templateUrl: 'js/directives/CategorySelector.html'
		}
	});

});