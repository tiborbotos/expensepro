define([
	'angular',
	'angular-sanitize',
	'angular-route',
	'angular-animate',
	'angular-ui-bootstrap',
	'dpd',

	'js/directives/categoryItem',
	'js/directives/categorySelector',
	'js/directives/transactionEditor',

	'js/controllers/CategoryCtrl',
	'js/controllers/UserController',
	'js/controllers/RegCtrl',
	'js/controllers/ExpenseCtrl',

	'js/model/CategoryService'], function() {
	'use strict';

	var module = angular.module('em', ['ngSanitize', 'ngRoute', 'ngAnimate', 'ui.bootstrap',
		'em.directives', 'em.controllers', 'em.model']);

	function init() {

		module.config(function($routeProvider, $locationProvider) {
			$routeProvider.when('/registration', {
				templateUrl: 'view/registration.html'
			}).when('/expense', {
				templateUrl: 'view/expense.html',
				controller: 'ExpenseCtrl'
			}).when('/settings', {
				templateUrl: 'view/categories.html'
			});

			$locationProvider.html5Mode(true);
		});

		angular.bootstrap(document, ['em']);
	}

	return {
		init: init,
		module: module
	};
});