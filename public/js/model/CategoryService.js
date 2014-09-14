define(['js/model/model', 'js/model/UserService', 'angular'], function(emModel) {
	'use strict';

	emModel.service('CategoryService', ['UserService', function(UserService) {
		var _categories = undefined;
		var self = this;

		this.categories = function (callback) {
			if (_categories) {
				callback(_categories);
			} else {
				loadCategories(callback);
			}
		};

		function loadCategories (callback) {
			var query = {"userid": UserService.uid()};
			dpd.categories.get(query, function (result) {
				self._categories = result[0].categories.categories;
				callback(self._categories);
			});
		}

	}]);

});