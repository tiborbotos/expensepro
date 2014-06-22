define(['js/model/model', 'angular'], function(emModel) {
	'use strict';

    emModel.service('CategoryModel', ['$http', function($http) {
		var _apiKey = 'K9nhjsr3jcTL9tlwf2WDSBw0TdYqYROWYPSGrXg2';
    	var _categories = undefined;
    	var _loaded = false;

    	this.categories = function(callback) {
    		if (_loaded) {
    			callback(_categories);
    		} else {
				this.loadCategories(callback);
    		}
    	};

    	this.loaded = function () {
    		return _loaded;
    	}

    	this.loadCategories = function (callback) {
    		_loaded = false;

			$http({method: 'GET', url: '/__categories.json'})
				.success(function(data){
					_loaded = true;
					_categories = data.categories;
					callback(_categories);
				})
				.error(function(data, status, headers, config) {
					console.log("Error retrieving categories!", data);
					console.log("Status", status);
					console.log("Headers", headers);
				});
    	}


		this.initCategories = function (userId) {
			$http({method: 'GET',
				url: 'https://api.mongohq.com/databases/em/collections/categories/documents' +
				'?_apikey=' + this._apiKey +
				'&q='})
		}
    }]);

});