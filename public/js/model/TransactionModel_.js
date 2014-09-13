define(['js/model/model', 'angular'], function(emModel) {
	'use strict';


    emModel.service('TransactionModel', ['$http', function($http) {
		var _apiKey = 'K9nhjsr3jcTL9tlwf2WDSBw0TdYqYROWYPSGrXg2';

    	this.saveTransaction = function (transaction, callback, error) {
    		$http({
    			url: 'https://api.mongolab.com/api/1/databases/em/collections/transactions?apiKey=' + this._apiKey,
    			method: 'POST',
    			data: JSON.stringify( transaction )
    		}).success(function (data) {
    			console.log('Data saved ', data);
    			callback(data);
    		}).error(function(data, status, headers, config) {
    			console.log('Failed to save! ', data);
    			console.log('Status ', status);
    		});
    	};

	}]);

});