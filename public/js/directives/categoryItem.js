define(['js/directives/directives', 'angular'], function(emDirectives) {
	'use strict';

	emDirectives.factory('RecursionHelper', ['$compile', function($compile){
		return {
			compile: function (element, link) {
				if (angular.isFunction(link)) {
					link = {post: link};
				}
				var contents = element.contents().remove();
				var compiledContents;
				return {
					pre: (link && link.pre) ? link.pre : null,
					post: function (scope, element) {
						if (!compiledContents) {
							compiledContents = $compile(contents);
						}
						compiledContents(scope, function(clone) {
							element.append(clone);
						});
						if (link && link.post) {
							link.post.apply(null, arguments);
						}
					}
				};
			}
		};
	}]);

	emDirectives.directive('categoryItem', ['RecursionHelper', function(RecursionHelper) {
		return {
			restrict: 'AC',
			scope: {
				'category': '=',
				'editedcategory': '=',
				'categories': '='
			},
			controller: function($scope) {
				var originalLabel = '';
				$scope.newElementParentCategory = undefined;

				$scope.showSubCategories = function(category) {
					if (!category.showsubcategories) {
						category.showsubcategories = true;
					} else {
						category.showsubcategories = false;
					}
				};

				$scope.edit = function(category) {
					if ($scope.editedcategory.category) {
						if (!$scope.cancel($scope.editedcategory.category)) {
							return false;
						}
					}

					category.isineditmode = true;
					$scope.editedcategory.category = category;
					originalLabel = angular.copy(category.label);
				};

				$scope.createCategory = function(parentCategory) {
					if ($scope.editedcategory.category) {
						if (!$scope.cancel($scope.editedcategory)) {
							return false;
						}
					}
					$scope.newElementParentCategory = parentCategory;
					$scope.editedcategory.category = {"id": undefined, "label": ""};
					originalLabel = undefined;
				};

				$scope.newEditorVisible = function(category) {
					return category.sub !== undefined;
				};

				$scope.save = function(category) {
					if ($scope.editedcategory.category.id === undefined) {
						// server save
						$scope.editedcategory.category.id = Math.random() * 100;
						if ($scope.editedcategory.category.sub === undefined) {
						}
						$scope.newElementParentCategory.sub.push($scope.editedcategory.category);
						$scope.newElementParentCategory = undefined;
					}

					$scope.editedcategory.category.isineditmode = false;
					$scope.editedcategory.category = undefined;
				};

				$scope.cancel = function(category) {
					if (($scope.editedcategory.category.label === originalLabel) ||
						($scope.editedcategory.category.label === '' && originalLabel === undefined) ||
						($scope.editedcategory.category.label !== originalLabel  && confirm('Are you sure you want to loose all the changes?'))) {
						$scope.editedcategory.category.label = originalLabel;
						$scope.editedcategory.category.isineditmode = false;
						$scope.editedcategory.category = undefined;
						$scope.newElementParentCategory = undefined;
						return true;
					}
					return false;
				};

			},

			compile: function (element) {
				return RecursionHelper.compile(element);
			},
			name: 'categoryItem',
			templateUrl: 'js/directives/categoryItem.html'
		};
	}]);

});