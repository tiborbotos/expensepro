define(['js/model/model', 'js/model/UserService', 'angular'], function(emModel, UserService) {
	'use strict';

	emModel.service('CategoryModel', ['$http', function($http) {
		var _categories = undefined;
		var self = this;

		this.categories = function(callback) {
			if (_categories) {
				callback(_categories);
			} else {
				this.loadCategories(callback);
			}
		};

		this.initCategories = function (categories) {
			self._categories = categories;
		};

		function loadCategories(callback) {
			var query = {"userid": UserService.uid()};
			dpd.categories.get(query, function (result) {
				self._categories = result.categories;
				callback(self._categories);
			});
		}

	}]);

});