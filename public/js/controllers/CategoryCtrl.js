define(['angular', 'js/controllers/controllers'], function (angular_, controllers) {
	

	controllers.controller('CategoryCtrl', ['$scope', '$location', '$http', 'CategoryModel', function($scope, $location, $http, CategoryModel) {

		$scope.categories = [];
		$scope.editedcategory = {'category': undefined};

		$scope.newcategory = undefined;

		init();

		$scope.createTopCategory = function() {
			$scope.newcategory = {'id': undefined, 'label': '', 'sub': [], 'showsubcategories': true};
		};
		$scope.save = function() {
			$scope.newcategory.id = Math.random() * 1000;
			$scope.categories.push($scope.newcategory);
			$scope.newcategory = undefined;
		};
		$scope.cancel = function() {
			if (($scope.newcategory.label === '') ||
				($scope.newcategory.label !== '' && confirm('Are you sure you want to cancel?'))) {
				$scope.newcategory = undefined;
			}
		};




		function init() {
			CategoryModel.categories(function (data) {
				$scope.categories = data;
			});
		}


	}]);
});