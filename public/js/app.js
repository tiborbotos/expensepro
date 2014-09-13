define(['angular', 'angular-sanitize', 'angular-route', 'angular-animate', 'angular-ui-bootstrap',
	'dpd',
	'js/directives/categoryItem',
	'js/directives/categorySelector',
	'js/directives/transactionEditor',
	'js/controllers/CategoryCtrl',
	'js/controllers/TransactionCtrl',
	'js/controllers/UserController',
	'js/controllers/RegCtrl',
	'js/model/CategoryService',
	'js/model/TransactionModel_'], function() {
    'use strict';

    var module = angular.module('em', ['ngSanitize', 'ngRoute', 'ngAnimate', 'ui.bootstrap',
    	'em.directives', 'em.controllers', 'em.model']);

	function init() {

		module.config(function($routeProvider, $locationProvider) {
			$routeProvider.when('/registration', {
				templateUrl: 'view/registration.html'
				//controller: 'RegCtrl'
			})/*.when('/tra', {
				templateUrl: 'chapter.html',
				controller: 'ChapterController'
			})*/;

			//$locationProvider.html5Mode(true);
		});

		angular.bootstrap(document, ['em']);
	}

    return {
        init: init,
        module: module
    };
});